<script>
  import { Router, Route } from "svelte-routing";
  import Login from "./lib/Login.svelte";
  import Inicio from "./lib/Inicio.svelte";
</script>

<Router>
  <Route path="/" component={Login} />
  <Route path="/inicio" component={Inicio} />
</Router>

<style>
</style>
