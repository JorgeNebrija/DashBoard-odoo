<script>
  import Router from "svelte-spa-router";
  import Login from "./lib/Login.svelte";
  import Inicio from "./lib/Inicio.svelte";

  const routes = {
    "/": Login,
    "/inicio": Inicio
  };
</script>

<Router {routes} />
