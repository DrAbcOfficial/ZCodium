export interface Stat {
  value: string;
  label: string;
  tone?: "brand" | "warn";
}

export const stats: Stat[] = [
  { value: "86.6%", label: "样本快照中 .git 内部数据占比", tone: "warn" },
  { value: "42,411", label: "单个样本被打包的文件总数", tone: "warn" },
  { value: "564", label: "原文记录的上传失败重试次数", tone: "warn" },
  { value: "62", label: "单会话日志中快照事件峰值", tone: "brand" },
];

export type IconName = "scope" | "lock" | "shield" | "repeat";

export interface Fact {
  icon: IconName;
  title: string;
  body: string;
}

export const facts: Fact[] = [
  {
    icon: "scope",
    title: "上传范围远超推理所需",
    body: "不只是一次对话用到的代码片段：完整提交历史、历史版本里删除过的密钥、未推送分支、reflog 操作轨迹、LFS 大文件缓存，全部被打包。",
  },
  {
    icon: "lock",
    title: "只有云端能解密",
    body: "本地 AES-256-CTR 加密后，密钥再用服务端动态下发的 RSA 公钥封装。私钥仅存云端，本地密文连用户自己和客户端都解不开。",
  },
  {
    icon: "shield",
    title: "界面上关不掉",
    body: "“优化体验”只管训练授权，“仓库快照索引”只管服务端是否建索引。两份独立调查都确认：没有任何开关能阻止本地打包与上传。",
  },
  {
    icon: "repeat",
    title: "删掉就自动重传",
    body: "手动删除本地快照后，后台检测到缺失会重新全量打包再上传，纯手动删除变成了打地鼠。原文样本记录了 564 次失败重试。",
  },
];

export interface TimelineEntry {
  date: string;
  title: string;
  tag: string;
  body: string;
  tone?: "danger" | "warn";
}

export const timeline: TimelineEntry[] = [
  {
    date: "2026-09-18",
    title: "曝光",
    tag: "一手取证",
    tone: "danger",
    body: "ferstar 公开完整逆向分析：客户端向服务端申请 OSS 凭证，本地打包加密后直传阿里云对象存储，加密公钥由服务端下发。社区多名开发者独立复现。",
  },
  {
    date: "2026-09-18",
    title: "官方致歉",
    tag: "承认事实",
    body: "智谱在用户群致歉，确认问题源于“代码库索引”功能默认开启，承诺开源客户端代码、引入第三方安全审计，并为用户补偿一次周额度重置。",
  },
  {
    date: "2026-09-19",
    title: "修复版本发布",
    tag: "客户端侧",
    tone: "warn",
    body: "ZCode v3.14.0 发布，更新日志写明“修复仓库百科异常上传的问题”。复查确认上传组件与凭证接口均已移除，接口返回 404。",
  },
  {
    date: "2026-09-19",
    title: "企业发函追责",
    tag: "法律层面",
    body: "太原承明科技公开函件，要求提供数据删除证明、披露数据处理记录，并追问数据是否跨境传输，保留法律追责权利。",
  },
  {
    date: "2026-09-21",
    title: "代码开源",
    tag: "审计起点",
    body: "智谱正式开源 ZCode 客户端代码，并公布中国信通院与绿盟科技首轮核查结果：OSS 存储桶已删除、v3.14.0 已切断本地仓库快照生成与上传链路。",
  },
];

export interface AuditStep {
  title: string;
  body: string;
}

export const auditSteps: AuditStep[] = [
  {
    title: "验证整改，而不是相信整改",
    body: "全仓库检索快照打包、信封加密、OSS 直传与凭证申请相关代码，确认完整 Git 历史打包上传的实现已不在当前版本中。",
  },
  {
    title: "移除全部监控与遥测",
    body: "在审计基础上，将桌面客户端、CLI 与 UI 中的监控/遥测实现整体移除（ARMS RUM、OTLP、崩溃采集、资源与网络采样、UI 埋点等，约 2.6 万行），并加入防回归检查阻止其被重新引入。",
  },
  {
    title: "建立逐版本审计基线",
    body: "以上游 v3.14.0 为基线，后续每一次上游更新都会做 diff 审计，新增的网络外发与数据收集行为必须被解释。",
  },
];

export interface Commitment {
  title: string;
  body: string;
  link?: { text: string; url: string };
}

export const commitments: Commitment[] = [
  {
    title: "跟踪并同步上游",
    body: "及时审阅上游代码仓库的每一次改动，逐版本 diff 审计后只同步无风险代码；涉及数据外发、遥测扩张的改动不会直接合入，而是先记录并公开说明。",
    link: { text: "zai-org/ZCode", url: "https://github.com/zai-org/ZCode" },
  },
  {
    title: "过滤潜在有害代码",
    body: "一旦发现静默外发、遥测越界、未经确认的数据上传实现，在本仓库移除或加装防护，并公开说明改了什么、为什么。",
  },
  {
    title: "只信可验证的证据",
    body: "“已删除”“不留存”“不用于训练”等无法独立验证的声明，不作为安全依据。审计结论以可复现的代码与行为为准。",
  },
  {
    title: "公开审计记录",
    body: "每次审计的方法、发现与局限性都记录在仓库和本网站中，欢迎开发者复核、质疑和补充。",
  },
  {
    title: "GitHub 构建与发布",
    body: "审计后的代码通过 GitHub Actions 构建，CLI 发行包发布到 Releases，站点自动部署到 GitHub Pages；所有产物都来自经过审计的源码。",
    link: {
      text: "Releases",
      url: "https://github.com/Zcode-Open-Audit/Zcode-Open-Audit/releases",
    },
  },
];

export interface SourceEntry {
  name: string;
  host: string;
  url: string;
}

export const sources: SourceEntry[] = [
  {
    name: "ferstar：扒一扒 ZCode 静默上传全量 Git 历史的骚操作",
    host: "blog.ferstar.org",
    url: "https://blog.ferstar.org/posts/zcode-silent-workspace-snapshot-upload/",
  },
  {
    name: "魔都水滴：独立复现与三端一键防护方案",
    host: "blog.margrop.net",
    url: "https://blog.margrop.net/post/zcode-silent-git-upload-investigation/",
  },
  {
    name: "智谱官方开源仓库（上游）",
    host: "github.com/zai-org/ZCode",
    url: "https://github.com/zai-org/ZCode",
  },
  {
    name: "澎湃新闻：智谱回应数据隐私争议与审计结果",
    host: "thepaper.cn",
    url: "https://www.thepaper.cn/newsDetail_forward_34111815",
  },
  {
    name: "界面新闻：企业发函追责与智谱三次官方回应",
    host: "jiemian.com",
    url: "https://www.jiemian.com/article/15120609.html",
  },
  {
    name: "IT之家：ZCode 官宣开源并致歉",
    host: "ithome.com",
    url: "https://www.ithome.com/1/005/046.htm",
  },
  {
    name: "虎嗅：程序员亲历 ZCode 事件与行业影响",
    host: "huxiu.com",
    url: "https://www.huxiu.com/article/4892416.html",
  },
  {
    name: "凤凰网：数据出境质疑与企业追责进展",
    host: "tech.ifeng.com",
    url: "https://tech.ifeng.com/c/8waIS4X7FAe",
  },
];

export const repoUrl = "https://github.com/Zcode-Open-Audit/Zcode-Open-Audit";
export const upstreamUrl = "https://github.com/zai-org/ZCode";
