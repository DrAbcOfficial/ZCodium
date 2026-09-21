<script lang="ts">
  import DownloadButton from "./DownloadButton.svelte";
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
        持续跟踪上游
      </span>
    </div>

    <h1
      class="mb-5 text-[clamp(32px,5.2vw,54px)] leading-[1.18] font-bold tracking-[-0.015em] text-slate-100"
    >
      我们审计代码。
    </h1>

    <p class="mb-8 max-w-[720px] text-[clamp(15.5px,1.6vw,17.5px)] text-slate-400">
      这个仓库 fork 自上游开源代码。监控与遥测已经全部移除，上游改动逐提交审阅，只同步无风险的部分；发行包都从这里的源码构建。
    </p>

    <DownloadButton />
  </div>
</section>
