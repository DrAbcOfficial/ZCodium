<script lang="ts">
  import { copy, repoUrl, upstreamUrl } from "../data/content";
  import { i18n } from "./i18n.svelte";

  const t = $derived(copy[i18n.lang]);
  const issuesUrl = `${repoUrl}/issues`;
</script>

<footer class="border-t border-white/10 bg-ink-900 py-11">
  <div class="wrap flex flex-wrap justify-between gap-6 text-[13.5px] text-slate-400">
    <div class="max-w-[640px]">
      <strong class="font-semibold">{t.footer.disclaimerTitle}</strong>
      <p class="mt-2">
        {t.footer.disclaimerBefore}
        <a class="text-sky-400 hover:underline" href={issuesUrl}>Issue</a>{t.footer.disclaimerAfter}
      </p>
    </div>
    <div class="flex flex-col gap-2">
      <a class="text-sky-400 hover:underline" href={repoUrl}>{t.footer.links.repo}</a>
      <a class="text-sky-400 hover:underline" href={upstreamUrl}>{t.footer.links.upstream}</a>
      <a class="text-sky-400 hover:underline" href={issuesUrl}>{t.footer.links.feedback}</a>
    </div>
  </div>
</footer>
