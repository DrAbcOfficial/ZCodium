<script lang="ts">
  import { copy } from "../data/content";
  import { i18n } from "./i18n.svelte";
  import { reveal } from "./reveal";

  const t = $derived(copy[i18n.lang]);
</script>

<section id="compare" class="section section-alt">
  <div class="wrap">
    <p class="kicker">{t.compare.kicker}</p>
    <h2 class="section-title">{t.compare.title}</h2>
    <p class="mb-2 text-[12.5px] text-slate-500 md:hidden">{t.compare.scrollHint}</p>
    <div class="overflow-x-auto">
      <table class="compare-table">
        <thead>
          <tr>
            <th scope="col">{t.compare.headers.item}</th>
            <th scope="col" class="is-audit">{t.compare.headers.audit}</th>
            <th scope="col">{t.compare.headers.client}</th>
            <th scope="col">{t.compare.headers.oss}</th>
          </tr>
        </thead>
        <tbody>
          {#each t.compare.rows as row}
            <tr use:reveal>
              <th scope="row">{row.item}</th>
              <td class="is-audit">{row.audit}</td>
              <td>{row.client}</td>
              <td>{row.oss}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>
