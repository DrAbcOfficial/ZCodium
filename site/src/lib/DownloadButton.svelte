<script lang="ts">
  import { onMount } from "svelte";
  import GithubIcon from "./GithubIcon.svelte";

  const RELEASES_URL = "https://github.com/Zcode-Open-Audit/Zcode-Open-Audit/releases";
  // 我们的版本目前都以 Pre-release 发布，/releases/latest 会 404，因此取列表里的第一个带发行包的版本。
  const RELEASES_API = "https://api.github.com/repos/Zcode-Open-Audit/Zcode-Open-Audit/releases?per_page=5";

  type OsKind = "macos" | "windows" | "linux" | "unknown";

  interface ReleaseAsset {
    name?: string;
    browser_download_url?: string;
  }

  interface ReleaseInfo {
    tag_name?: string;
    assets?: ReleaseAsset[];
  }

  let os = $state<OsKind>("unknown");
  let version = $state("");
  let downloadUrl = $state(RELEASES_URL);

  onMount(() => {
    const ua = navigator.userAgent;
    os = /Mac/i.test(ua) ? "macos" : /Win/i.test(ua) ? "windows" : /Linux/i.test(ua) ? "linux" : "unknown";
    void loadLatestRelease();
  });

  async function loadLatestRelease() {
    try {
      const res = await fetch(RELEASES_API, { headers: { Accept: "application/vnd.github+json" } });
      if (!res.ok) return;
      const list = (await res.json()) as ReleaseInfo[];
      if (!Array.isArray(list)) return;
      const release = list.find((item) =>
        (item.assets ?? []).some((asset) => asset.name?.endsWith(".tar.gz")),
      );
      if (!release) return;
      version = release.tag_name ?? "";
      const asset = (release.assets ?? []).find((item) => item.name?.endsWith(".tar.gz"));
      if (asset?.browser_download_url) {
        downloadUrl = asset.browser_download_url;
      }
    } catch {
      // 网络不可用时保持 Release 页面链接
    }
  }

  const osLabel = $derived(
    os === "macos" ? "macOS" : os === "windows" ? "Windows" : os === "linux" ? "Linux" : "",
  );

  const installHint = $derived(
    os === "windows"
      ? "CLI 发行包，需 Node.js 24；在 Git Bash 或 WSL 里解压运行"
      : "CLI 发行包，需 Node.js 24；解压后运行 install.sh",
  );
</script>

<div class="flex flex-col gap-2.5">
  <div class="flex flex-wrap items-center gap-3">
    <a
      class="inline-flex items-center gap-2 rounded-[9px] bg-sky-400 px-5 py-2.5 text-sm font-semibold text-[#06121c] no-underline transition-colors hover:bg-sky-300"
      href={downloadUrl}
    >
      <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 2v8m0 0 3.2-3.2M8 10 4.8 6.8M3 12.5h10"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      下载{osLabel ? ` ${osLabel} 版` : "最新版"}
      {#if version}<span class="font-mono text-[12.5px] opacity-80">{version}</span>{/if}
    </a>
    <a
      class="inline-flex items-center gap-2 rounded-[9px] border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-slate-100 no-underline transition-colors hover:border-white/30 hover:bg-white/[0.06]"
      href="https://github.com/Zcode-Open-Audit/Zcode-Open-Audit"
    >
      <GithubIcon class="h-[15px] w-[15px]" />
      查看源码
    </a>
  </div>
  <p class="text-[13px] text-slate-500">
    {installHint} · <a class="text-sky-400 hover:underline" href={RELEASES_URL}>全部版本</a>
  </p>
</div>
