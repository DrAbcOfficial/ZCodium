export interface AuditStep {
  title: string;
  body: string;
}

export const auditSteps: AuditStep[] = [
  {
    title: "审计敏感链路",
    body: "全仓库检索快照打包、加密与直传相关代码，确认当前版本中不存在未经确认的数据外发实现。",
  },
  {
    title: "移除全部监控与遥测",
    body: "将桌面客户端、CLI 与 UI 中的监控/遥测实现整体移除（ARMS RUM、OTLP、崩溃采集、资源与网络采样、UI 埋点等，约 2.6 万行），并加入防回归检查阻止其被重新引入。",
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

export const repoUrl = "https://github.com/Zcode-Open-Audit/Zcode-Open-Audit";
export const upstreamUrl = "https://github.com/zai-org/ZCode";
