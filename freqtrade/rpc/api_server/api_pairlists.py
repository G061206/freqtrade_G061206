import logging
from copy import deepcopy
from pathlib import Path
from typing import Any

from fastapi import APIRouter, BackgroundTasks, Depends
from fastapi.exceptions import HTTPException

from freqtrade.constants import Config
from freqtrade.enums import CandleType
from freqtrade.exceptions import OperationalException
from freqtrade.persistence import FtNoDBContext
from freqtrade.rpc.api_server.api_schemas import (
    BgJobStarted,
    ExchangeModePayloadMixin,
    PairListsPayload,
    PairListsResponse,
    WhitelistEvaluateResponse,
)
from freqtrade.rpc.api_server.deps import get_config, get_exchange
from freqtrade.rpc.api_server.webserver_bgwork import ApiBG


logger = logging.getLogger(__name__)

# Private API, protected by authentication and webserver_mode dependency
router = APIRouter()


def _path_in_userdir(filename: str, user_data_dir: Path) -> Path:
    file_path = Path(filename)
    if not file_path.is_absolute():
        file_path = user_data_dir / file_path

    file_path = file_path.resolve()
    user_data_dir = user_data_dir.resolve()
    if not file_path.is_relative_to(user_data_dir):
        raise HTTPException(
            status_code=400,
            detail="RemotePairList file paths must stay within the user-data directory.",
        )

    return file_path


def _validate_api_pairlists(
    pairlists: list[dict[str, Any]], config: Config
) -> list[dict[str, Any]]:
    pairlists = deepcopy(pairlists)
    user_data_dir = None

    for pairlist in pairlists:
        if pairlist.get("method") != "RemotePairList":
            continue

        if user_data_dir is None:
            user_data_dir = Path(config["user_data_dir"])

        pairlist_url = pairlist.get("pairlist_url")
        if not pairlist_url:
            raise HTTPException(
                status_code=400,
                detail="RemotePairList requires a `pairlist_url`.",
            )

        if not isinstance(pairlist_url, str) or not pairlist_url.startswith("file:///"):
            raise HTTPException(
                status_code=400,
                detail=(
                    "RemotePairList HTTP(S) URLs are not allowed in API pairlist evaluation."
                ),
            )

        filename = pairlist_url.split("file:///", 1)[1]
        pairlist_path = _path_in_userdir(filename, user_data_dir)
        # RemotePairList strips a fixed file:/// prefix, so preserve the
        # leading slash for absolute POSIX paths.
        pairlist["pairlist_url"] = f"file:///{pairlist_path.as_posix()}"

        save_to_file = pairlist.get("save_to_file")
        if save_to_file:
            raise HTTPException(
                status_code=400,
                detail="RemotePairList `save_to_file` is not allowed in API pairlist evaluation.",
            )

    return pairlists


@router.get("/pairlists/available", response_model=PairListsResponse)
def list_pairlists(config=Depends(get_config)):
    from freqtrade.resolvers import PairListResolver

    pairlists = PairListResolver.search_all_objects(config, False)
    pairlists = sorted(pairlists, key=lambda x: x["name"])

    return {
        "pairlists": [
            {
                "name": x["name"],
                "is_pairlist_generator": x["class"].is_pairlist_generator,
                "params": x["class"].available_parameters(),
                "description": x["class"].description(),
            }
            for x in pairlists
        ]
    }


def __run_pairlist(job_id: str, config_loc: Config):
    try:
        ApiBG.jobs[job_id]["is_running"] = True
        from freqtrade.plugins.pairlistmanager import PairListManager

        with FtNoDBContext():
            exchange = get_exchange(config_loc)
            config_loc["candle_type_def"] = exchange._config["candle_type_def"]
            pairlists = PairListManager(exchange, config_loc)
            pairlists.refresh_pairlist()
            ApiBG.jobs[job_id]["result"] = {
                "method": pairlists.name_list,
                "length": len(pairlists.whitelist),
                "whitelist": pairlists.whitelist,
            }
            ApiBG.jobs[job_id]["status"] = "success"
    except (OperationalException, Exception) as e:
        logger.exception(e)
        ApiBG.jobs[job_id]["error"] = str(e)
        ApiBG.jobs[job_id]["status"] = "failed"
    finally:
        ApiBG.jobs[job_id]["is_running"] = False
        ApiBG.pairlist_running = False


@router.post("/pairlists/evaluate", response_model=BgJobStarted)
def pairlists_evaluate(
    payload: PairListsPayload, background_tasks: BackgroundTasks, config=Depends(get_config)
):
    if ApiBG.pairlist_running:
        raise HTTPException(status_code=400, detail="Pairlist evaluation is already running.")

    config_loc = deepcopy(config)
    config_loc["stake_currency"] = payload.stake_currency
    config_loc["pairlists"] = _validate_api_pairlists(payload.pairlists, config)
    handleExchangePayload(payload, config_loc)
    # TODO: overwrite blacklist? make it optional and fall back to the one in config?
    # Outcome depends on the UI approach.
    config_loc["exchange"]["pair_blacklist"] = payload.blacklist
    # Random job id
    job_id = ApiBG.get_job_id()

    ApiBG.jobs[job_id] = {
        "category": "pairlist",
        "status": "pending",
        "progress": None,
        "is_running": False,
        "result": {},
        "error": None,
    }
    background_tasks.add_task(__run_pairlist, job_id, config_loc)
    ApiBG.pairlist_running = True

    return {
        "status": "Pairlist evaluation started in background.",
        "job_id": job_id,
    }


def handleExchangePayload(payload: ExchangeModePayloadMixin, config_loc: Config):
    """
    Handle exchange and trading mode payload.
    Updates the configuration with the payload values.
    """
    from freqtrade.configuration.directory_operations import create_datadir

    if payload.exchange:
        config_loc["exchange"]["name"] = payload.exchange
        config_loc.update({"datadir": create_datadir(config_loc, None)})
    if payload.trading_mode:
        config_loc["trading_mode"] = payload.trading_mode
        config_loc["candle_type_def"] = CandleType.get_default(
            config_loc.get("trading_mode", "spot") or "spot"
        )

    if payload.margin_mode:
        config_loc["margin_mode"] = payload.margin_mode


@router.get("/pairlists/evaluate/{jobid}", response_model=WhitelistEvaluateResponse)
def pairlists_evaluate_get(jobid: str):
    if not (job := ApiBG.jobs.get(jobid)):
        raise HTTPException(status_code=404, detail="Job not found.")

    if job["is_running"]:
        raise HTTPException(status_code=400, detail="Job not finished yet.")

    if error := job["error"]:
        return {
            "status": "failed",
            "error": error,
        }

    return {
        "status": "success",
        "result": job["result"],
    }
