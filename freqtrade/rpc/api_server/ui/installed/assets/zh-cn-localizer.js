(function () {
  "use strict";

  const exact = new Map(
    Object.entries({
      "FreqtradeUI": "Freqtrade 界面",
      "UI": " 界面",
      ".": "。",
      "Freqtrade bot Login": "Freqtrade 机器人登录",
      "Login to your bot": "登录到机器人",
      "Enter your bot credentials to connect": "输入机器人凭据以连接",
      "Bot Name": "机器人名称",
      "Submit": "提交",
      "Welcome to the": "欢迎使用",
      "Welcome to the FreqtradeUI": "欢迎使用 Freqtrade 界面",
      "This page allows you to control your trading bot.": "你可以在这里控制交易机器人。",
      "If you need any help, please refer to the": "如果需要帮助，请查看",
      "Freqtrade Documentation": "Freqtrade 文档",
      "If you need any help, please refer to the Freqtrade Documentation .":
        "如果需要帮助，请查看 Freqtrade 文档。",
      "Have fun -": "祝你使用愉快 -",
      "wishes you the Freqtrade team": "Freqtrade 团队",
      "Have fun - wishes you the Freqtrade team": "祝你使用愉快 - Freqtrade 团队",
      "We're sorry but FreqUI doesn't work properly without JavaScript enabled. Please enable it to continue.":
        "抱歉，FreqUI 需要启用 JavaScript 才能正常工作。请启用后继续。",

      "Trade": "交易",
      "Trades": "交易",
      "History": "历史",
      "Dashboard": "仪表盘",
      "Chart": "图表",
      "Charts": "图表",
      "Logs": "日志",
      "Settings": "设置",
      "Backtesting": "回测",
      "Download Data": "下载数据",
      "Pairlist": "交易对列表",
      "Pairlists": "交易对列表",
      "Configuration": "配置",
      "Config": "配置",
      "Results": "结果",
      "Home": "首页",
      "Login": "登录",
      "Logout": "退出登录",
      "No bot selected": "未选择机器人",
      "Toggle Night Mode": "切换夜间模式",
      "Confirm Dialog deactivated.": "确认弹窗已关闭。",
      "Auto Refresh for all bots": "所有机器人自动刷新",
      "Auto Refresh all bots now": "立即刷新所有机器人",
      "Bot": "机器人",
      "bot": "机器人",
      "bots": "机器人",
      "Account": "账户",
      "Balance": "余额",
      "Account Balance": "账户余额",
      "Bot Balance": "机器人余额",

      "Username": "用户名",
      "Password": "密码",
      "API Url": "API 地址",
      "API url": "API 地址",
      "Bot name": "机器人名称",
      "Add new bot": "添加新机器人",
      "Add new Bot": "添加新机器人",
      "Available bots": "可用机器人",
      "Edit bot": "编辑机器人",
      "Delete bot": "删除机器人",
      "This URL is already in use by another bot.": "此 URL 已被另一个机器人使用。",
      "Save": "保存",
      "Cancel": "取消",
      "Close": "关闭",
      "Delete": "删除",
      "Remove": "移除",
      "Add": "添加",
      "Edit": "编辑",
      "Copy": "复制",
      "Copied!": "已复制！",
      "Refresh": "刷新",
      "Reload": "重载",
      "Reset": "重置",
      "Start": "启动",
      "Stop": "停止",
      "Pause": "暂停",
      "Confirm": "确认",
      "Evaluate": "评估",
      "Search": "搜索",
      "Clear": "清除",
      "Select": "选择",
      "Apply": "应用",
      "Open": "打开",
      "New": "新建",
      "Rename": "重命名",
      "Duplicate": "复制副本",
      "Enable": "启用",
      "Disable": "禁用",
      "Enabled": "已启用",
      "Disabled": "已禁用",
      "Loading": "加载中",
      "Loading...": "加载中...",
      "Success": "成功",
      "Error": "错误",
      "Warning": "警告",
      "Info": "信息",
      "Yes": "是",
      "No": "否",
      "On": "开",
      "Off": "关",
      "None": "无",
      "All": "全部",
      "Total": "总计",
      "Available": "可用",
      "Currency": "币种",
      "Status": "状态",
      "State": "状态",
      "Version": "版本",
      "Strategy": "策略",
      "Exchange": "交易所",
      "Stake currency": "计价币种",
      "Stake currency:": "计价币种：",
      "Copy from:": "复制自：",

      "FreqUI Settings": "FreqUI 设置",
      "UI settings": "界面设置",
      "UI Version": "界面版本",
      "Lock dynamic layouts": "锁定动态布局",
      "Lock dynamic layouts, so they cannot move anymore. Can also be set from the navbar at the top.":
        "锁定动态布局，防止布局被拖动。也可以在顶部导航栏中设置。",
      "Reset layout": "重置布局",
      "Reset dynamic layouts to how they were.": "将动态布局恢复为默认状态。",
      "Show open trades in header": "在标题栏显示打开交易",
      "Decide if open trades should be visualized": "设置是否在标题栏显示打开交易。",
      "Show pill in icon": "在图标中显示徽标",
      "Show in title": "显示在标题中",
      "Don't show open trades in header": "不在标题栏显示打开交易",
      "UTC Timezone": "UTC 时区",
      "Select timezone (UTC is recommended as exchanges usually work in UTC)":
        "选择时区（建议使用 UTC，因为交易所通常使用 UTC）。",
      "Background sync": "后台同步",
      "Keep background sync running while other bots are selected.":
        "选择其他机器人时仍保持后台同步运行。",
      "Show Confirm Dialog for Trade Exits": "平仓时显示确认弹窗",
      "Use confirmation dialogs when force-exiting a trade.":
        "强制退出交易时显示确认弹窗。",
      "This will also show": "这也会在标题栏显示",
      "in the title bar.": "。",
      "Show Text on Multi Pane Buttons": "多窗格按钮显示文字",
      "Show text on multi pane buttons. If disabled, only shows images.":
        "在多窗格按钮上显示文字。关闭后只显示图标。",

      "Chart settings": "图表设置",
      "Chart scale Side": "图表坐标轴位置",
      "Should the scale be displayed on the right or left?":
        "坐标轴应显示在右侧还是左侧？",
      "Left": "左侧",
      "Right": "右侧",
      "Use Heikin Ashi candles": "使用 Heikin Ashi 蜡烛图",
      "Use Heikin Ashi candles in your charts": "在图表中使用 Heikin Ashi 蜡烛图。",
      "Only request necessary columns": "仅请求必要列",
      "Can reduce the transfer size for large dataframes. May require additional calls if the plot config changes.":
        "可减少大型数据表的传输量。若绘图配置变化，可能需要额外请求。",
      "Default number of candles to display (defaults to 250)":
        "默认显示的蜡烛数量（默认 250）",
      "Candle Color Preference": "蜡烛颜色偏好",
      "Green Up/Red Down": "上涨绿色 / 下跌红色",
      "Green Down/Red Up": "下跌绿色 / 上涨红色",

      "Notification Settings": "通知设置",
      "Entry notifications": "入场通知",
      "Exit notifications": "出场通知",
      "Entry Cancel notifications": "入场取消通知",
      "Exit Cancel notifications": "出场取消通知",

      "Backtesting settings": "回测设置",
      "Backtesting metrics": "回测指标",
      "Select which metrics should be shown on a per pair / tag basis.":
        "选择按交易对 / 标签显示哪些指标。",
      "Run backtest": "运行回测",
      "Backtest": "回测",
      "Backtest result": "回测结果",
      "Backtest results": "回测结果",
      "Backtest history": "回测历史",
      "Timerange": "时间范围",
      "Timeframe": "时间周期",
      "Starting balance": "初始余额",
      "Max open trades": "最大打开交易数",
      "Fee": "手续费",
      "Export": "导出",
      "Load": "加载",
      "Notes": "备注",
      "Profit": "收益",
      "Profit %": "收益率",
      "Profit Factor": "收益因子",
      "Profit Factor, Expectancy": "收益因子、期望值",
      "Expectancy": "期望值",
      "Total Profit": "总收益",
      "Total trades": "总交易数",
      "Best Pair": "最佳交易对",
      "Worst Pair": "最差交易对",
      "Best day": "最佳日期",
      "Worst day": "最差日期",
      "Win/Draw/Loss": "盈利 / 持平 / 亏损",
      "Drawdown": "回撤",

      "Blacklist": "黑名单",
      "Blacklisted Pairs": "黑名单交易对",
      "Pairlist Configuration": "交易对列表配置",
      "Pairlist Config": "交易对列表配置",
      "Save configuration": "保存配置",
      "Evaluate pairlist": "评估交易对列表",
      "Invalid configuration": "配置无效",
      "The first entry in the pairlist must be a Generating pairlist, like StaticPairList or VolumePairList.":
        "交易对列表的第一项必须是生成型列表，例如 StaticPairList 或 VolumePairList。",
      "Custom Exchange": "自定义交易所",
      "Generating pairlist": "生成型交易对列表",
      "Filter": "过滤",
      "Append": "追加",

      "Download data": "下载数据",
      "Data download": "数据下载",
      "Pairs": "交易对",
      "Available pairs": "可用交易对",
      "Candle type": "K 线类型",
      "Trading mode": "交易模式",
      "Download": "下载",

      "Open trades": "打开交易",
      "Closed trades": "已关闭交易",
      "Trade ID": "交易 ID",
      "Pair": "交易对",
      "Side": "方向",
      "Amount": "数量",
      "Open rate": "开仓价",
      "Close rate": "平仓价",
      "Open date": "开仓时间",
      "Close date": "平仓时间",
      "Current profit": "当前收益",
      "Entry": "入场",
      "Exit": "出场",
      "Long": "做多",
      "Short": "做空",
      "Force exit": "强制平仓",
      "Force enter": "强制入场",

      "Daily": "每日",
      "Weekly": "每周",
      "Monthly": "每月",
      "Performance": "表现",
      "Statistics": "统计",
      "System": "系统",
      "Health": "健康状态",
      "Messages": "消息",
      "Log level": "日志级别",
      "Show all balances": "显示全部余额",
      "Hide small balances": "隐藏小额余额",
      "Showing Bot balance": "正在显示机器人余额",
      "Showing Account balance": "正在显示账户余额",
    })
  );

  const phraseRules = [
    [/^UI Version:\s*(.*)$/i, "界面版本：$1"],
    [/^Increase over initial capital of (.*)$/i, "相对初始资金增加 $1"],
    [/^Total profit Long$/i, "做多总收益"],
    [/^Total profit Short$/i, "做空总收益"],
    [/^Total trades \/ Daily Avg Trades$/i, "总交易数 / 日均交易数"],
    [/^Days win\/draw\/loss$/i, "盈利 / 持平 / 亏损天数"],
    [/^Profit at Drawdown start \| end(.*)$/i, "回撤开始 / 结束时收益$1"],
    [/^Drawdown start(.*)$/i, "回撤开始$1"],
    [/^Drawdown end(.*)$/i, "回撤结束$1"],
    [/^Max Drawdown abs(.*)$/i, "最大绝对回撤$1"],
    [/^Max Drawdown(.*)$/i, "最大回撤$1"],
    [/^(.+) Balance$/i, "$1余额"],
    [/^in (.+)$/i, "折合 $1"],
  ];

  const wordRules = [
    [/\bFreqtradeUI\b/g, "Freqtrade 界面"],
    [/\bBacktesting\b/g, "回测"],
    [/\bDashboard\b/g, "仪表盘"],
    [/\bSettings\b/g, "设置"],
    [/\bDownload Data\b/g, "下载数据"],
    [/\bTrade\b/g, "交易"],
    [/\bLogs\b/g, "日志"],
    [/\bChart\b/g, "图表"],
    [/\bBalance\b/g, "余额"],
    [/\bProfit\b/g, "收益"],
    [/\b[Bb]ots?\b/g, "机器人"],
    [/\bDialog\b/g, "弹窗"],
    [/\bAuto Refresh\b/g, "自动刷新"],
  ];

  function translateText(value) {
    if (!value) {
      return value;
    }

    const leading = value.match(/^\s*/)[0];
    const trailing = value.match(/\s*$/)[0];
    const body = value.trim().replace(/\s+/g, " ");
    if (body === ".") {
      return "。";
    }
    if (!body || /[\u4e00-\u9fff]/.test(body)) {
      return value;
    }

    let translated = exact.get(body);
    if (!translated) {
      for (const [pattern, replacement] of phraseRules) {
        if (pattern.test(body)) {
          translated = body.replace(pattern, replacement);
          break;
        }
      }
    }

    if (!translated) {
      translated = body;
      for (const [source, target] of exact) {
        if (source.length >= 6) {
          translated = translated.replaceAll(source, target);
        }
      }
      for (const [pattern, replacement] of wordRules) {
        translated = translated.replace(pattern, replacement);
      }
      if (translated === body) {
        return value;
      }
    }

    return `${leading}${translated}${trailing}`;
  }

  function translateAttributes(element) {
    for (const attr of ["title", "aria-label", "placeholder", "alt"]) {
      if (!element.hasAttribute(attr)) {
        continue;
      }
      const original = element.getAttribute(attr);
      const translated = translateText(original);
      if (translated !== original) {
        element.setAttribute(attr, translated);
      }
    }
  }

  function translateNode(root) {
    if (!root) {
      return;
    }

    if (root.nodeType === Node.ELEMENT_NODE) {
      const element = root;
      if (["SCRIPT", "STYLE", "CODE", "PRE"].includes(element.tagName)) {
        return;
      }
      translateAttributes(element);
    }

    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
      {
        acceptNode(node) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            return ["SCRIPT", "STYLE", "CODE", "PRE"].includes(node.tagName)
              ? NodeFilter.FILTER_REJECT
              : NodeFilter.FILTER_ACCEPT;
          }
          return node.nodeValue && node.nodeValue.trim()
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        },
      }
    );

    const textNodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.nodeType === Node.ELEMENT_NODE) {
        translateAttributes(node);
      } else {
        textNodes.push(node);
      }
    }

    for (const node of textNodes) {
      const translated = translateText(node.nodeValue);
      if (translated !== node.nodeValue) {
        node.nodeValue = translated;
      }
    }
  }

  function translatePage() {
    document.documentElement.lang = "zh-CN";
    document.title = "FreqUI 中文版";
    translateNode(document.body);
  }

  let scheduled = false;
  function scheduleTranslate() {
    if (scheduled) {
      return;
    }
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      translatePage();
    });
  }

  document.addEventListener("DOMContentLoaded", translatePage);
  window.addEventListener("load", translatePage);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList" || mutation.type === "characterData") {
        scheduleTranslate();
        return;
      }
      if (mutation.type === "attributes") {
        translateAttributes(mutation.target);
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    characterData: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["title", "aria-label", "placeholder", "alt"],
  });
})();
