export interface WorkItem {
  title: string;
  body: string;
}

export const currentChanges: WorkItem[] = [
  {
    title: "移除全部监控与遥测",
    body: "ARMS RUM、OTLP 上报、崩溃采集、资源与网络采样、UI 埋点全部删除，约 2.6 万行；另外加了防回归检查，防止这些出口被重新引入。",
  },
  {
    title: "换成自己的品牌",
    body: "应用名、窗口标题、关于对话框、应用图标都改成了 ZCode Open Audit，界面文案也一并更新。",
  },
  {
    title: "审计敏感路径",
    body: "对快照打包、加密、直传相关的代码做了全仓库检索。当前版本里没有未经确认的数据外发实现。",
  },
  {
    title: "接通构建与发布",
    body: "GitHub Actions 负责构建 CLI 发行包和部署本站。发版走 Release workflow，填一个版本号就能出包。",
  },
];

export const nextSteps: WorkItem[] = [
  {
    title: "逐提交审阅上游",
    body: "zai-org/ZCode 的每次提交都做 diff 审计，不等发版才看。",
  },
  {
    title: "只同步无风险代码",
    body: "数据外发、监控遥测、权限扩张这类改动会剥离或拒绝合入，并在审计记录里写明原因。",
  },
  {
    title: "同步后重新构建",
    body: "每次同步都会构建并发布新的审计版本，产物全部来自本仓库的源码。",
  },
];

export interface CompareRow {
  item: string;
  officialClient: string;
  officialOss: string;
  audit: string;
}

export const compareRows: CompareRow[] = [
  {
    item: "监控与遥测",
    officialClient: "全套默认开启，开关管不到打包上传",
    officialOss: "与闭源版相同",
    audit: "全部移除（约 2.6 万行），并加防回归检查",
  },
  {
    item: "仓库上传逻辑",
    officialClient: "有（直到 2026-09-18 被曝光）",
    officialOss: "已移除（自 2026-09-21 起）",
    audit: "已移除",
  },
  {
    item: "历史版本回溯",
    officialClient: "旧版本下载链接已下架",
    officialOss: "旧版本下载链接已下架",
    audit: "保留全部历史版本与提交记录，供审计回溯",
  },
  {
    item: "构建透明度",
    officialClient: "官方二进制，构建不可复现",
    officialOss: "不提供公开构建",
    audit: "GitHub Actions 从仓库源码透明构建，产物随 Release 发布",
  },
  {
    item: "Issue 与共建",
    officialClient: "不开放",
    officialOss: "关闭",
    audit: "开放（Issue 与 Discussions），欢迎共建讨论",
  },
  {
    item: "安装包签名",
    officialClient: "已签名",
    officialOss: "不提供安装包",
    audit: "未签名（附一键放行命令）",
  },
];

export const repoUrl = "https://github.com/Zcode-Open-Audit/Zcode-Open-Audit";
export const upstreamUrl = "https://github.com/zai-org/ZCode";
