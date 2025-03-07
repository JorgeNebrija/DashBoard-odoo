<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import NavBar from "./components/NavBar.svelte";
  import SideBar from "./components/SideBar.svelte";
  import { usuario } from "../lib/store";  // ← Importar el store del usuario
  import Sortable from "sortablejs";

  // Lista de módulos según el rol del usuario
  const modulos = {
    admin: [
      { nombre: "Facturación", ruta: "/facturacion", icon: "facturacion.png" },
      { nombre: "Finanzas", ruta: "/finanzas", icon: "finanzas.png" },
      { nombre: "Recursos Humanos", ruta: "/rrhh", icon: "rrhh.png" },
      { nombre: "Ventas", ruta: "/ventas", icon: "ventas.png" },
      { nombre: "Inventario", ruta: "/inventario", icon: "inventario.png" }
    ],
    empleado: [
      { nombre: "Ventas", ruta: "/ventas", icon: "ventas.png" },
      { nombre: "Inventario", ruta: "/inventario", icon: "inventario.png" }
    ]
  };

  let datosUsuario;
  let modulosFiltrados = [];
  let listElement;
  const clave_sesion = "orden_modulo";

  usuario.subscribe((valor) => {
    datosUsuario = valor;

    // Filtrar módulos según el rol
    if (datosUsuario?.rol) {
      modulosFiltrados = modulos[datosUsuario.rol] || [];
      
      // Cargar orden desde sessionStorage si existe
      if (sessionStorage.getItem(clave_sesion)) {
        const ordenGuardado = JSON.parse(sessionStorage.getItem(clave_sesion));
        modulosFiltrados = ordenGuardado;
      }
    }
  });

  function irA(ruta) {
    push(ruta);
  }

  onMount(() => {
    Sortable.create(listElement, {
      animation: 200,
      ghostClass: "sortable-ghost", // Clase que se aplica al ítem fantasma
      chosenClass: "sortable-chosen", // Clase mientras arrastras
      dragClass: "sortable-drag", // Clase opcional para más control
      onEnd: (evt) => {
        const [movedItem] = modulosFiltrados.splice(evt.oldIndex, 1);
        modulosFiltrados.splice(evt.newIndex, 0, movedItem);
        sessionStorage.setItem(clave_sesion, JSON.stringify(modulosFiltrados));
      },
    });
  });
</script>

<div class="container">
  <SideBar />

  <div class="content">
    <NavBar />
    <div class="grid" bind:this={listElement}>
      {#each modulosFiltrados as modulo}
        <div class="module" on:click={() => irA(modulo.ruta)}>
          <img src={`/icons/${modulo.icon}`} alt={modulo.nombre} width="24" height="24" />
          <br />{modulo.nombre}
        </div>
      {/each}
    </div>
  </div>
</div>


<style>
  .container {
    display: flex;
    height: 100vh;
  }
  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background: #f4f4f4;
  }

  .grid {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    padding: 50px;
  }

  .module {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    width: 15%;
    height: 150px;
    padding: 20px;
    text-align: center;
    border-radius: 8px;
    cursor: grab;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    font-weight: bold;
  }

  .module img {
    width: 35px;
    height: 35px;
  }

  .module:hover {
    background: #f0f0f0;
  }

  /* Elimina la transparencia del fantasma */
  .sortable-ghost {
    opacity: 1;
    background-color: white;
  }

  /* Opcionalmente, añade estilo al ítem que arrastras */
  .sortable-chosen {
    background-color: white;
    transform: scale(1.05);
  }

  @media (max-width: 800px) {
    .grid {
      padding: 20px;
      gap: 30px;
    }
    .module {
      height: 100px;
      width: 25%;
    }
  }
</style>
