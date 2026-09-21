<script lang="ts">
  import { repoUrl, upstreamUrl } from "../data/content";
  import GithubIcon from "./GithubIcon.svelte";
</script>

<section class="hero-glow hero-dots relative overflow-hidden pt-24 pb-20">
  <div class="relative z-10 mx-auto max-w-[1080px] px-6">
    <div class="mb-5 flex flex-wrap gap-2">
      <span
        class="inline-flex items-center gap-[7px] rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-[12.5px] font-semibold tracking-[0.02em] text-slate-400"
      >
        <span class="h-[7px] w-[7px] rounded-full bg-sky-400 ring-[3px] ring-sky-400/10"></span>
        独立审计 · 非官方 Fork
      </span>
      <span
        class="inline-flex items-center gap-[7px] rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-[12.5px] font-semibold tracking-[0.02em] text-slate-400"
      >
        持续跟踪上游 · 只同步无风险代码
      </span>
    </div>

    <h1
      class="mb-5 text-[clamp(32px,5.2vw,54px)] leading-[1.18] font-bold tracking-[-0.015em] text-slate-100"
    >
      我们审计代码，<br /><span class="gradient-text">而不是相信承诺。</span>
    </h1>

    <p class="mb-8 max-w-[720px] text-[clamp(15.5px,1.6vw,17.5px)] text-slate-400">
      本仓库 fork 自上游开源代码，逐版本审计、只同步无风险代码，并已移除全部监控与遥测实现——<strong
        class="font-semibold text-slate-100">所有产物都来自经过审计的源码。</strong
      >
    </p>

    <div class="flex flex-wrap gap-3">
      <a
        class="inline-flex items-center gap-2 rounded-[9px] bg-sky-400 px-4 py-2.5 text-sm font-semibold text-[#06121c] no-underline transition-colors hover:bg-sky-300"
        href={repoUrl}
      >
        <GithubIcon class="h-[15px] w-[15px]" />
        查看审计仓库
      </a>
      <a
        class="inline-flex items-center gap-2 rounded-[9px] border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-slate-100 no-underline transition-colors hover:border-white/30 hover:bg-white/[0.06]"
        href={upstreamUrl}
      >
        上游仓库
      </a>
    </div>
  </div>
</section>
