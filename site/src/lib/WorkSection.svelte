<script lang="ts">
  import type { WorkItem } from "../data/content";
  import { reveal } from "./reveal";

  interface Props {
    id: string;
    kicker: string;
    title: string;
    items: WorkItem[];
    alt?: boolean;
  }

  let { id, kicker, title, items, alt = false }: Props = $props();
</script>

<section {id} class="section" class:section-alt={alt}>
  <div class="wrap">
    <p class="kicker">{kicker}</p>
    <h2 class="section-title">{title}</h2>
    <ol class="m-0 list-none p-0">
      {#each items as item, index}
        <li class="work-row" use:reveal>
          <span class="work-index">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3 class="work-title">{item.title}</h3>
            <p class="work-body">{item.body}</p>
          </div>
        </li>
      {/each}
    </ol>
  </div>
</section>
