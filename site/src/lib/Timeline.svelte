<script lang="ts">
  import { timeline } from "../data/content";
  import { reveal } from "./reveal";
</script>

<p class="kicker">Timeline</p>
<h2 class="section-title">事件时间线</h2>
<ol class="timeline">
  {#each timeline as entry}
    <li class="timeline-item" data-tone={entry.tone} use:reveal>
      <span class="tl-date">{entry.date}</span>
      <p class="tl-title">{entry.title}<span class="tl-tag">{entry.tag}</span></p>
      <p class="tl-desc">{entry.body}</p>
    </li>
  {/each}
</ol>
