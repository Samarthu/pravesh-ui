<script>
  import "../styles/tailwind-output.css";
  import tailwind from "../styles/tailwind.css";
  import Breadcrumb from "./breadcrumb.svelte";
  import Nav from "./nav.svelte";
  import Sidenav from "./sidenav.svelte";
</script>

<!-- Try some classes here -->
<!-- <h1 class="lowercase text-indigo-500">
    Tailwind Worked Successfully!!!
  </h1> -->

<Nav />
<Sidenav />

<slot />
