import re
from pathlib import Path

from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from starlette.responses import FileResponse, HTMLResponse


router_ui = APIRouter(include_in_schema=False, tags=["Web UI"])

_ZH_CN_LOCALIZER_SCRIPT = "/assets/zh-cn-localizer.js"
_ZH_CN_TITLE = "FreqUI \u4e2d\u6587\u7248"


def _inject_zh_cn_ui(index_html: str) -> str:
    if _ZH_CN_LOCALIZER_SCRIPT not in index_html:
        script_tag = f'  <script defer src="{_ZH_CN_LOCALIZER_SCRIPT}"></script>\n'
        if "</head>" in index_html:
            index_html = index_html.replace("</head>", f"{script_tag}</head>", 1)
        else:
            index_html = f"{index_html}\n{script_tag}"

    index_html = re.sub(
        r'(<html\b[^>]*\blang=")[^"]*(")',
        lambda match: f"{match.group(1)}zh-CN{match.group(2)}",
        index_html,
        count=1,
        flags=re.IGNORECASE,
    )
    index_html = re.sub(
        r"(<title>).*?(</title>)",
        lambda match: f"{match.group(1)}{_ZH_CN_TITLE}{match.group(2)}",
        index_html,
        count=1,
        flags=re.IGNORECASE | re.DOTALL,
    )
    return index_html


def _localized_index_response(index_file: Path):
    try:
        return HTMLResponse(_inject_zh_cn_ui(index_file.read_text(encoding="utf-8")))
    except OSError:
        return FileResponse(str(index_file))


@router_ui.get("/favicon.ico")
async def favicon():
    return FileResponse(str(Path(__file__).parent / "ui/favicon.ico"))


@router_ui.get("/fallback_file.html")
async def fallback():
    return FileResponse(str(Path(__file__).parent / "ui/fallback_file.html"))


@router_ui.get("/ui_version")
async def ui_version():
    from freqtrade.commands.deploy_ui import read_ui_version

    uibase = Path(__file__).parent / "ui/installed/"
    version = read_ui_version(uibase)

    return {
        "version": version if version else "not_installed",
    }


@router_ui.get("/{rest_of_path:path}")
async def index_html(rest_of_path: str):
    """
    Emulate path fallback to index.html.
    """
    if rest_of_path.startswith("api") or rest_of_path.startswith("."):
        raise HTTPException(status_code=404, detail="Not Found")
    uibase = (Path(__file__).parent / "ui/installed/").resolve()
    filename = (uibase / rest_of_path).resolve()
    index_file = uibase / "index.html"
    # It's security relevant to check "relative_to".
    # Without this, Directory-traversal is possible.
    media_type: str | None = None
    if filename.suffix == ".js":
        # Force text/javascript for .js files - Circumvent faulty system configuration
        media_type = "application/javascript"
    if filename.is_file() and filename.is_relative_to(uibase):
        if filename == index_file:
            return _localized_index_response(index_file)
        return FileResponse(str(filename), media_type=media_type)

    if not index_file.is_file():
        return FileResponse(str(uibase.parent / "fallback_file.html"))
    # Fall back to index.html, as indicated by vue router docs
    return _localized_index_response(index_file)
