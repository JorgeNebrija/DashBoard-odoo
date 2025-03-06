<script>
import Router from "svelte-spa-router";
  import { Route, navigate } from "svelte-routing";
  import Login from "./lib/Login.svelte";
  import Inicio from "./lib/Inicio.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    // Si no hay pathname o está vacío, redirige a "/"
    if (location.pathname === "") {
      navigate("/", { replace: true });
    }
  });
</script>

<Router>
  <Route path="/" component={Login} />
  <Route path="/inicio" component={Inicio} />
</Router>
