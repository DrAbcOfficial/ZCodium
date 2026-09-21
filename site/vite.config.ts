import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/Zcode-Open-Audit/",
  plugins: [tailwindcss(), svelte()],
  build: {
    // 构建产物直接输出到仓库根的 docs/，由 GitHub Pages 以分支目录方式托管。
    outDir: "../docs",
    emptyOutDir: true,
  },
});
