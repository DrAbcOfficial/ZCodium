<script lang="ts">
  import Nav from "./lib/Nav.svelte";
  import Hero from "./lib/Hero.svelte";
  import CompareSection from "./lib/CompareSection.svelte";
  import WorkSection from "./lib/WorkSection.svelte";
  import SiteFooter from "./lib/SiteFooter.svelte";
  import { copy } from "./data/content";
  import { i18n } from "./lib/i18n.svelte";

  const t = $derived(copy[i18n.lang]);
</script>

<Nav />
<main id="top">
  <Hero />
  <CompareSection />
  <WorkSection
    id="current"
    kicker={t.current.kicker}
    title={t.current.title}
    items={t.current.items}
  />
  <WorkSection id="next" kicker={t.next.kicker} title={t.next.title} items={t.next.items} />
</main>
<SiteFooter />
