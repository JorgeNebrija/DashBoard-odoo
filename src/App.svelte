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
  import ProteccionRuta from "./lib/components/ProteccionRuta.svelte";
  import { onMount } from "svelte";
  import { usuario } from "./lib/store";
  import { autenticacion, onAuthStateChanged } from "./lib/firebase";

  // Detectar si hay un usuario autenticado al cargar la app
  onMount(() => {
    onAuthStateChanged(autenticacion, (usuarioActual) => {
      if (usuarioActual) {
        usuario.set({ correo: usuarioActual.email });
      } else {
        usuario.set(null);
      }
    });
  });

  // Definir rutas protegidas
  const rutas = {
    "/": Login,
    "/registro": Registro,
    "/inicio": ProteccionRuta, // Protegido
    "/facturacion": ProteccionRuta, // Protegido
    "/finanzas": ProteccionRuta, // Protegido
    "/inventario": ProteccionRuta, // Protegido
    "/rrhh": ProteccionRuta, // Protegido
    "/ventas": ProteccionRuta, // Protegido
  };

  // Mapear las rutas protegidas a sus respectivos componentes
  const rutasConComponentes = {
    "/inicio": Inicio,
    "/facturacion": Facturacion,
    "/finanzas": Finanzas,
    "/inventario": Inventario,
    "/rrhh": RecursosHumanos,
    "/ventas": Ventas,
  };
</script>

<Router {rutas}>
  {#each Object.entries(rutasConComponentes) as [ruta, Componente]}
    <svelte:component this={Componente} />
  {/each}
</Router>
