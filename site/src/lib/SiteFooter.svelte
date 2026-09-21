<script lang="ts">
  import { repoUrl, upstreamUrl } from "../data/content";
</script>

<footer class="border-t border-white/10 bg-ink-900 py-11">
  <div class="wrap flex flex-wrap justify-between gap-6 text-[13.5px] text-slate-400">
    <div class="max-w-[640px]">
      <strong class="font-semibold">免责声明</strong>
      <p class="mt-2">
        本站与智谱（北京智谱华章科技股份有限公司）无隶属关系。所有事实陈述来自公开报道与独立代码审计，并已注明出处。如相关方认为内容有误，欢迎通过
        <a class="text-sky-400 hover:underline" href={`${repoUrl}/issues`}>Issue</a> 提交更正。
      </p>
    </div>
    <div class="flex flex-col gap-2">
      <a class="text-sky-400 hover:underline" href={repoUrl}>审计仓库</a>
      <a class="text-sky-400 hover:underline" href={upstreamUrl}>上游仓库</a>
      <a class="text-sky-400 hover:underline" href={`${repoUrl}/issues`}>问题反馈</a>
    </div>
  </div>
</footer>
