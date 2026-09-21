<script lang="ts">
  import { repoUrl } from "../data/content";
  import GithubIcon from "./GithubIcon.svelte";

  const links = [
    { href: "#current", label: "改了什么" },
    { href: "#next", label: "接下来" },
  ];
</script>

<header class="sticky top-0 z-50 border-b border-white/10 bg-ink-950/80 backdrop-blur-md">
  <div class="mx-auto flex h-16 max-w-[1080px] items-center justify-between gap-4 px-6">
    <a
      href="#top"
      class="flex items-center gap-2.5 font-semibold whitespace-nowrap text-slate-100 no-underline"
    >
      <svg class="h-[22px] w-[22px] shrink-0" viewBox="0 0 1024 1024" fill="none" aria-hidden="true">
        <defs>
          <linearGradient
            id="oa-diagonal"
            x1="712"
            y1="224"
            x2="300"
            y2="800"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#38bdf8" />
            <stop offset="1" stop-color="#818cf8" />
          </linearGradient>
        </defs>
        <path d="M184 224H512L453 308Q439 328 415 328H184Z" fill="#38bdf8" />
        <path d="M584 224H832L424 800H176Z" fill="url(#oa-diagonal)" />
        <path d="M536 720L600 656L648 704L824 528L888 592L648 832Z" fill="#38bdf8" />
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
