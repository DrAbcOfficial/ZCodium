<script lang="ts">
  import { commitments } from "../data/content";
  import { reveal } from "./reveal";
</script>

<section id="commitment" class="section section-alt">
  <div class="wrap">
    <p class="kicker">Commitment</p>
    <h2 class="section-title">我们会继续做什么</h2>
    <p class="section-lead">
      一次事件修复不等于长期可信。这个仓库存在的原因，是让“可信”变成一个可以被持续检查的过程。
    </p>
    <div class="grid gap-4 md:grid-cols-2">
      {#each commitments as item, index}
        <div class="card" use:reveal>
          <span class="num-chip">{String(index + 1).padStart(2, "0")}</span>
          <h3>{item.title}</h3>
          <p>
            {item.body}
            {#if item.link}
              <a class="text-sky-400 hover:underline" href={item.link.url}>{item.link.text}</a>
            {/if}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>
