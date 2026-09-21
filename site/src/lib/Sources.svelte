<script lang="ts">
  import { sources } from "../data/content";
  import Icon from "./Icon.svelte";
  import { reveal } from "./reveal";
</script>

<section id="sources" class="section">
  <div class="wrap">
    <p class="kicker">Sources</p>
    <h2 class="section-title">一手资料与报道</h2>
    <p class="section-lead">所有事实陈述均以下列公开来源为依据，欢迎逐条核对。</p>
    <ul class="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
      {#each sources as source}
        <li use:reveal>
          <a class="source-card" href={source.url}>
            <Icon name="arrow" class="h-[15px] w-[15px]" />
            <span>
              <span class="s-name">{source.name}</span>
              <span class="s-host">{source.host}</span>
            </span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>
