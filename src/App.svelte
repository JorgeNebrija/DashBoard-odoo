<script>
  import Router from "svelte-spa-router";
  import Login from "./lib/Login.svelte";
  import Registro from "./lib/Registro.svelte";
  import Inicio from "./lib/Inicio.svelte";
  import Facturacion from "./lib/modules/Facturacion.svelte";
  import Finanzas from "./lib/modules/Finanzas.svelte";
  import Inventario from "./lib/modules/Inventario.svelte";
  import RecursosHumanos from "./lib/modules/RecursosHumanos.svelte";
  import Ventas from "./lib/modules/Ventas.svelte";
  import Fabricacion from "./lib/modules/Fabricacion.svelte";
  import Graficas from "./lib/modules/Graficas.svelte";



  const routes = {
    "/": Login,
    "/registro": Registro,
    "/inicio": Inicio,
    "/facturacion": Facturacion,
    "/finanzas": Finanzas,
    "/inventario": Inventario,
    "/rrhh": RecursosHumanos,
    "/ventas": Ventas,
    "/fabricacion": Fabricacion,
    "/graficas" : Graficas
  };
</script>

<Router {routes} />
