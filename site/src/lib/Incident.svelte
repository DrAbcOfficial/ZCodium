<script lang="ts">
  import { facts } from "../data/content";
  import Icon from "./Icon.svelte";
  import Timeline from "./Timeline.svelte";
  import { reveal } from "./reveal";
</script>

<section id="incident" class="section section-alt">
  <div class="wrap">
    <p class="kicker">Incident</p>
    <h2 class="section-title">发生了什么</h2>
    <p class="section-lead">
      2026 年 9 月 18 日，开发者 ferstar 在清理磁盘时发现 <code
        class="rounded-[5px] border border-white/10 bg-white/[0.06] px-1.5 py-px font-mono text-[0.88em] text-[#c9e8fb]"
        >~/.zcode</code
      > 占用异常，顺藤摸瓜还原出一条完整的<strong>静默打包、加密、直传对象存储</strong>链路。多名开发者随后独立复现，智谱官方确认并致歉。
    </p>

    <p class="mb-10 text-[14.5px]">
      <a
        class="text-sky-400 hover:underline"
        href="https://github.com/Zcode-Open-Audit/Zcode-Open-Audit/blob/main/INCIDENT.md"
        >阅读完整事件文档（取证过程、技术细节、未决问题）</a
      >
    </p>

    <div class="mb-16 grid gap-4 md:grid-cols-2">
      {#each facts as fact}
        <div class="card" use:reveal>
          <span
            class="mb-3.5 inline-flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-red-400/10 text-red-400"
          >
            <Icon name={fact.icon} />
          </span>
          <h3>{fact.title}</h3>
          <p>{fact.body}</p>
        </div>
      {/each}
    </div>

    <Timeline />
  </div>
</section>
