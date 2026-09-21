export type Lang = "zh" | "en";

export interface CompareRow {
  item: string;
  audit: string;
  client: string;
  oss: string;
}

export interface WorkItem {
  title: string;
  body: string;
}

export interface Copy {
  nav: {
    compare: string;
    changes: string;
    next: string;
  };
  hero: {
    badges: [string, string];
    title: string;
    lead: string;
    downloadLabel: string;
    osSuffix: string;
    viewSource: string;
    hints: {
      macos: string;
      windows: string;
      linux: string;
      other: string;
    };
    allVersions: string;
  };
  compare: {
    kicker: string;
    title: string;
    scrollHint: string;
    headers: {
      item: string;
      audit: string;
      client: string;
      oss: string;
    };
    rows: CompareRow[];
  };
  current: {
    kicker: string;
    title: string;
    items: WorkItem[];
  };
  next: {
    kicker: string;
    title: string;
    items: WorkItem[];
  };
  footer: {
    disclaimerTitle: string;
    disclaimerBefore: string;
    disclaimerAfter: string;
    links: {
      repo: string;
      upstream: string;
      feedback: string;
    };
  };
}

export const copy: Record<Lang, Copy> = {
  zh: {
    nav: {
      compare: "对比",
      changes: "改了什么",
      next: "接下来",
    },
    hero: {
      badges: ["独立审计 · 非官方 Fork", "持续跟踪上游"],
      title: "我们审计 ZCode 代码。",
      lead: "这个仓库 fork 自上游开源代码。监控与遥测已经全部移除，上游改动逐提交审阅，只同步无风险的部分；发行包都从这里的源码构建。",
      downloadLabel: "下载",
      osSuffix: " 版",
      viewSource: "查看源码",
      hints: {
        macos: "未签名的 .dmg：拖入“应用程序”后，用 sudo xattr -rd com.apple.quarantine 放行一次",
        windows: "未签名的 .exe：安装前先执行 Unblock-File 解除阻止",
        linux: "未签名的 .AppImage：chmod +x 后直接运行",
        other: "CLI 发行包，需要 Node.js 24",
      },
      allVersions: "全部版本与安装命令",
    },
    compare: {
      kicker: "Compare",
      title: "和官方版本的区别",
      scrollHint: "表格可左右滑动查看",
      headers: {
        item: "对比项",
        audit: "ZCodium（本仓库）",
        client: "官方客户端（闭源）",
        oss: "官方开源版",
      },
      rows: [
        {
          item: "监控与遥测",
          audit: "全部移除（约 2.6 万行），并加防回归检查",
          client: "全套默认开启，开关管不到打包上传",
          oss: "与闭源版相同",
        },
        {
          item: "仓库上传逻辑",
          audit: "已移除",
          client: "有（直到 2026-09-18 被曝光）",
          oss: "已移除（自 2026-09-21 起）",
        },
        {
          item: "历史版本回溯",
          audit: "保留全部历史版本与提交记录，供审计回溯",
          client: "旧版本下载链接已下架",
          oss: "旧版本下载链接已下架",
        },
        {
          item: "构建透明度",
          audit: "GitHub Actions 从仓库源码透明构建，产物随 Release 发布",
          client: "官方二进制，构建不可复现",
          oss: "不提供公开构建",
        },
        {
          item: "Issue 与共建",
          audit: "开放（Issue 与 Discussions），欢迎共建讨论",
          client: "不开放",
          oss: "关闭",
        },
      ],
    },
    current: {
      kicker: "This release",
      title: "这个版本改了什么",
      items: [
        {
          title: "移除全部监控与遥测",
          body: "ARMS RUM、OTLP 上报、崩溃采集、资源与网络采样、UI 埋点全部删除，约 2.6 万行；另外加了防回归检查，防止这些出口被重新引入。",
        },
        {
          title: "换成自己的品牌",
          body: "应用名、窗口标题、关于对话框、应用图标都改成了 ZCodium，界面文案也一并更新。",
        },
        {
          title: "审计敏感路径",
          body: "对快照打包、加密、直传相关的代码做了全仓库检索。当前版本里没有未经确认的数据外发实现。",
        },
        {
          title: "接通构建与发布",
          body: "GitHub Actions 负责构建安装包和部署本站。发版走 Release workflow，填一个版本号就能出包。",
        },
      ],
    },
    next: {
      kicker: "Next",
      title: "接下来怎么走",
      items: [
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
      ],
    },
    footer: {
      disclaimerTitle: "免责声明",
      disclaimerBefore:
        "本站与智谱（北京智谱华章科技股份有限公司）无隶属关系。所有事实陈述来自公开报道与独立代码审计，并已注明出处。如相关方认为内容有误，欢迎通过",
      disclaimerAfter: " 提交更正。",
      links: {
        repo: "审计仓库",
        upstream: "上游仓库",
        feedback: "问题反馈",
      },
    },
  },
  en: {
    nav: {
      compare: "Compare",
      changes: "Changes",
      next: "Next",
    },
    hero: {
      badges: ["Independent audit · unofficial fork", "Tracking upstream"],
      title: "We audit ZCode.",
      lead: "This repo forks the upstream source. Monitoring and telemetry are gone, upstream changes are reviewed commit by commit, and only risk-free parts get synced. Every artifact is built from the audited source here.",
      downloadLabel: "Download",
      osSuffix: "",
      viewSource: "View source",
      hints: {
        macos: "Unsigned .dmg: after installing, run sudo xattr -rd com.apple.quarantine once",
        windows: "Unsigned .exe: run Unblock-File before installing",
        linux: "Unsigned .AppImage: chmod +x and run",
        other: "CLI distribution, needs Node.js 24",
      },
      allVersions: "All releases and install commands",
    },
    compare: {
      kicker: "Compare",
      title: "How it compares with upstream",
      scrollHint: "Swipe the table sideways",
      headers: {
        item: "Item",
        audit: "ZCodium (this repo)",
        client: "Official client (closed source)",
        oss: "Official open source",
      },
      rows: [
        {
          item: "Monitoring and telemetry",
          audit: "All removed (~26k lines), with regression checks",
          client: "Everything on by default; the switches never stopped packaging or uploads",
          oss: "Same as the closed-source client",
        },
        {
          item: "Repository upload logic",
          audit: "Removed",
          client: "Present (until the 2026-09-18 report)",
          oss: "Removed (since 2026-09-21)",
        },
        {
          item: "Historical versions",
          audit: "Full history and releases kept for audit trail",
          client: "Old download links pulled",
          oss: "Old download links pulled",
        },
        {
          item: "Build transparency",
          audit: "GitHub Actions builds transparently from this repo; artifacts ship with releases",
          client: "Vendor binaries, not reproducible",
          oss: "No public build",
        },
        {
          item: "Issues and collaboration",
          audit: "Open — issues and discussions welcome",
          client: "Not open",
          oss: "Closed",
        },
      ],
    },
    current: {
      kicker: "This release",
      title: "What this release changed",
      items: [
        {
          title: "Removed all monitoring and telemetry",
          body: "ARMS RUM, OTLP reporting, crash capture, resource and network sampling, UI instrumentation — about 26k lines deleted, with regression checks that keep those exits closed.",
        },
        {
          title: "Rebranded to ZCodium",
          body: "App name, window titles, About dialog, app icons and the UI copy all use the audit identity now.",
        },
        {
          title: "Audited the sensitive paths",
          body: "Snapshot packaging, encryption and direct-upload code was reviewed across the repository. This version has no unconsented data egress.",
        },
        {
          title: "Wired up builds and releases",
          body: "GitHub Actions builds the installers and deploys this site. Releases run through the Release workflow with a version number.",
        },
      ],
    },
    next: {
      kicker: "Next",
      title: "What happens next",
      items: [
        {
          title: "Review every upstream commit",
          body: "Each commit in zai-org/ZCode gets a diff audit, not just releases.",
        },
        {
          title: "Sync risk-free code only",
          body: "Data egress, monitoring/telemetry and permission expansion are stripped or rejected, with the reason recorded.",
        },
        {
          title: "Rebuild after every sync",
          body: "Every sync produces a new audited release built from this repository's source.",
        },
      ],
    },
    footer: {
      disclaimerTitle: "Disclaimer",
      disclaimerBefore:
        "Not affiliated with Zhipu (Beijing Zhipu Huazhang Technology Co., Ltd.). All statements come from public reporting and independent code review, with sources cited. If anything looks wrong, open an",
      disclaimerAfter: ".",
      links: {
        repo: "Repository",
        upstream: "Upstream",
        feedback: "Feedback",
      },
    },
  },
};

export const repoUrl = "https://github.com/Zcode-Open-Audit/ZCodium";
export const upstreamUrl = "https://github.com/zai-org/ZCode";
export const releasesUrl = "https://github.com/Zcode-Open-Audit/ZCodium/releases";
