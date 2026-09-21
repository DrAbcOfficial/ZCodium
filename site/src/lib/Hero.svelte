<script lang="ts">
  import { repoUrl, stats } from "../data/content";
  import GithubIcon from "./GithubIcon.svelte";
</script>

<section class="hero-glow hero-dots relative overflow-hidden pt-24 pb-16">
  <div class="relative z-10 mx-auto max-w-[1080px] px-6">
    <div class="mb-5 flex flex-wrap gap-2">
      <span
        class="inline-flex items-center gap-[7px] rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-[12.5px] font-semibold tracking-[0.02em] text-slate-400"
      >
        <span class="h-[7px] w-[7px] rounded-full bg-sky-400 ring-[3px] ring-sky-400/10"></span>
        独立审计 · 非官方 Fork
      </span>
      <span
        class="inline-flex items-center gap-[7px] rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[12.5px] font-semibold tracking-[0.02em] text-amber-200"
      >
        <span class="h-[7px] w-[7px] rounded-full bg-amber-400 ring-[3px] ring-amber-400/15"></span>
        基于 2026-09 静默上传事件
      </span>
    </div>

    <h1
      class="mb-5 text-[clamp(32px,5.2vw,54px)] leading-[1.18] font-bold tracking-[-0.015em] text-slate-100"
    >
      我们审计代码，<br /><span class="gradient-text">而不是相信承诺。</span>
    </h1>

    <p class="mb-8 max-w-[720px] text-[clamp(15.5px,1.6vw,17.5px)] text-slate-400">
      2026 年 9 月，ZCode 被曝在用户登录状态下
      <strong class="font-semibold text-slate-100">静默打包整个工作区（含完整 Git 历史）并上传云端</strong
      >，界面上没有任何开关可以关闭它。本仓库 fork 自官方开源代码，逐版本审计上游、过滤潜在有害代码，只以可验证的证据说话。
    </p>

    <div class="mb-14 flex flex-wrap gap-3">
      <a
        class="inline-flex items-center gap-2 rounded-[9px] bg-sky-400 px-4 py-2.5 text-sm font-semibold text-[#06121c] no-underline transition-colors hover:bg-sky-300"
        href={repoUrl}
      >
        <GithubIcon class="h-[15px] w-[15px]" />
        查看审计仓库
      </a>
      <a
        class="inline-flex items-center gap-2 rounded-[9px] border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-slate-100 no-underline transition-colors hover:border-white/30 hover:bg-white/[0.06]"
        href="https://blog.ferstar.org/posts/zcode-silent-workspace-snapshot-upload/"
      >
        阅读原始取证
      </a>
    </div>

    <div class="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
      {#each stats as stat}
        <div class="rounded-2xl border border-white/10 bg-ink-800 px-[18px] pt-[18px] pb-4">
          <div
            class="font-mono text-[clamp(22px,3vw,30px)] font-bold tracking-[-0.02em]"
            class:text-amber-400={stat.tone !== "brand"}
            class:text-sky-400={stat.tone === "brand"}
          >
            {stat.value}
          </div>
          <div class="mt-1.5 text-[13px] leading-snug text-slate-400">{stat.label}</div>
        </div>
      {/each}
    </div>
  </div>
</section>
