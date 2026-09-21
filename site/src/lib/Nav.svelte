<script lang="ts">
  import { repoUrl } from "../data/content";
  import GithubIcon from "./GithubIcon.svelte";

  const links = [
    { href: "#incident", label: "事件回顾" },
    { href: "#audit", label: "审计说明" },
    { href: "#commitment", label: "持续承诺" },
    { href: "#sources", label: "一手资料" },
  ];
</script>

<header class="sticky top-0 z-50 border-b border-white/10 bg-ink-950/80 backdrop-blur-md">
  <div class="mx-auto flex h-16 max-w-[1080px] items-center justify-between gap-4 px-6">
    <a
      href="#top"
      class="flex items-center gap-2.5 font-semibold whitespace-nowrap text-slate-100 no-underline"
    >
      <svg class="h-[22px] w-[22px] shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2.5 4.5 5.4v6.1c0 4.6 3.2 8.9 7.5 10 4.3-1.1 7.5-5.4 7.5-10V5.4L12 2.5Z"
          stroke="#38bdf8"
          stroke-width="1.6"
          stroke-linejoin="round"
        />
        <path
          d="M8.8 12.1l2.2 2.2 4.4-4.6"
          stroke="#38bdf8"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      ZCode Open Audit
    </a>
    <nav class="hidden items-center gap-1 md:flex" aria-label="页面导航">
      {#each links as link}
        <a
          class="rounded-lg px-3 py-1.5 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100 hover:no-underline"
          href={link.href}>{link.label}</a>
      {/each}
    </nav>
    <a
      class="inline-flex items-center gap-2 rounded-[9px] border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-slate-100 no-underline transition-colors hover:border-white/30 hover:bg-white/[0.06]"
      href={repoUrl}
    >
      <GithubIcon />
      GitHub
    </a>
  </div>
</header>
