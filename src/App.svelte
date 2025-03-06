<script>
  import Router from "svelte-spa-router";
  import Login from "./lib/Login.svelte";
  import Inicio from "./lib/Inicio.svelte";
  import Facturacion from "./lib/modules/Facturacion.svelte";
  import Finanzas from "./lib/modules/Finanzas.svelte";
  import Inventario from "./lib/modules/Inventario.svelte";
  import RecursosHumanos from "./lib/modules/recursosHumanos.svelte";
  import Ventas from "./lib/modules/Ventas.svelte";

  const routes = {
    "/": Login,
    "/inicio": Inicio,
    "/facturacion": Facturacion,
    "/finanzas": Finanzas,
    "/inventario": Inventario,
    "/rrhh": RecursosHumanos,
    "/ventas": Ventas,
  };
</script>

<Router {routes} />
