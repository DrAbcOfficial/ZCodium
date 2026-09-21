<script lang="ts">
  import type { IconName } from "../data/content";

  interface Props {
    name: IconName | "arrow";
    class?: string;
  }

  let { name, class: className = "h-[18px] w-[18px]" }: Props = $props();

  const paths: Record<IconName | "arrow", string[]> = {
    scope: ["M4 7h16", "M4 12h10", "M4 17h7"],
    lock: [
      "M7.5 10.5V7.8a4.5 4.5 0 0 1 9 0v2.7",
      "M5.5 10.5h13v8a1.5 1.5 0 0 1-1.5 1.5H7a1.5 1.5 0 0 1-1.5-1.5v-8Z",
    ],
    shield: [
      "M12 3.5 5 6v5.4c0 4.1 2.9 7.9 7 8.9 4.1-1 7-4.8 7-8.9V6l-7-2.5Z",
      "M9.6 12.2l1.8 1.8 3.4-3.6",
    ],
    repeat: ["M20 11a8 8 0 1 0-2.3 6.3", "M20 5.5V11h-5.5"],
    arrow: ["M7 17 17 7", "M9 7h8v8"],
  };
</script>

<svg class={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
  {#each paths[name] as d}
    <path
      {d}
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  {/each}
</svg>
