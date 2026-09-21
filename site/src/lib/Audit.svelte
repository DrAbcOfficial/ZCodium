<script lang="ts">
  import { auditSteps } from "../data/content";
  import { reveal } from "./reveal";
</script>

<section id="audit" class="section">
  <div class="wrap">
    <p class="kicker">Audit</p>
    <h2 class="section-title">我们做了什么</h2>
    <p class="section-lead">
      本仓库 fork 自智谱 2026-09-21 开源的客户端代码，完成了首轮独立审计与加固——<strong
        >不是复述公告，而是回到代码本身。</strong
      >
    </p>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {#each auditSteps as step, index}
        <div class="card" use:reveal>
          <span class="num-chip">{String(index + 1).padStart(2, "0")}</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </div>
      {/each}
    </div>
    <div class="note">
      <strong>关于这轮审计的边界：</strong>
      首轮审计是静态代码检索，不等同于完整动态取证（抓包、内存、服务端行为均不在覆盖范围内）。我们只陈述能验证的结论，并会持续更新发现与不确定性。
    </div>
  </div>
</section>
