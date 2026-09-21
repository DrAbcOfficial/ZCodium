<script lang="ts">
  import Nav from "./lib/Nav.svelte";
  import Hero from "./lib/Hero.svelte";
  import WorkSection from "./lib/WorkSection.svelte";
  import SiteFooter from "./lib/SiteFooter.svelte";
  import { currentChanges, nextSteps } from "./data/content";
</script>

<Nav />
<main id="top">
  <Hero />
  <WorkSection
    id="current"
    kicker="This release"
    title="这个版本改了什么"
    items={currentChanges}
  />
  <WorkSection id="next" kicker="Next" title="接下来怎么走" items={nextSteps} alt />
</main>
<SiteFooter />
