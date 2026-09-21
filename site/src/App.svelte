<script lang="ts">
  import Nav from "./lib/Nav.svelte";
  import Hero from "./lib/Hero.svelte";
  import Incident from "./lib/Incident.svelte";
  import Audit from "./lib/Audit.svelte";
  import Commitment from "./lib/Commitment.svelte";
  import Sources from "./lib/Sources.svelte";
  import SiteFooter from "./lib/SiteFooter.svelte";
</script>

<Nav />
<main id="top">
  <Hero />
  <Incident />
  <Audit />
  <Commitment />
  <Sources />
</main>
<SiteFooter />
