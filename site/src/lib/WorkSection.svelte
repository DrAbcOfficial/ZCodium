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
    <ul class="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
      {#each items as item, index}
        <li class="card" use:reveal>
          <span class="num-chip">{String(index + 1).padStart(2, "0")}</span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </li>
      {/each}
    </ul>
  </div>
</section>
