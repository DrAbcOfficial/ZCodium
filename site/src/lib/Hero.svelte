<script lang="ts">
  import DownloadButton from "./DownloadButton.svelte";
  import { copy } from "../data/content";
  import { i18n } from "./i18n.svelte";
  import logoUrl from "../assets/logo.svg";

  const t = $derived(copy[i18n.lang]);
</script>

<section class="hero-glow hero-dots relative overflow-hidden pt-24 pb-20">
  <div
    class="relative z-10 mx-auto grid max-w-[1080px] items-center gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr]"
  >
    <div>
      <div class="mb-5 flex flex-wrap gap-2">
        <span
          class="inline-flex items-center gap-[7px] rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-[12.5px] font-semibold tracking-[0.02em] text-slate-400"
        >
          <span class="h-[7px] w-[7px] rounded-full bg-sky-400 ring-[3px] ring-sky-400/10"></span>
          {t.hero.badges[0]}
        </span>
        <span
          class="inline-flex items-center gap-[7px] rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-[12.5px] font-semibold tracking-[0.02em] text-slate-400"
        >
          {t.hero.badges[1]}
        </span>
      </div>

      <h1
        class="mb-5 text-[clamp(32px,5.2vw,54px)] leading-[1.18] font-bold tracking-[-0.015em] text-slate-100"
      >
        {t.hero.title}
      </h1>

      <p class="mb-8 max-w-[600px] text-[clamp(15.5px,1.6vw,17.5px)] text-slate-400">
        {t.hero.lead}
      </p>

      <DownloadButton />
    </div>

    <div class="hidden justify-center lg:flex" aria-hidden="true">
      <img src={logoUrl} alt="" class="h-60 w-60" />
    </div>
  </div>
</section>
