<script>
  import { push } from "svelte-spa-router";
  import { usuario } from "../store";
  import { cerrarSesion } from "../../lib/firebase";
  import { onMount } from "svelte";
  import { modulos } from "../../modules";
  import SideBar from "./SideBar.svelte"; // Importamos tu componente SideBar

  let datosUsuario;
  usuario.subscribe((valor) => (datosUsuario = valor));

  let busqueda = "";
  let modulosDisponibles = [];
  let modulosFiltrados = [];
  let mostrarSidebar = false;

  onMount(() => {
    if (datosUsuario?.rol) {
      modulosDisponibles = modulos[datosUsuario.rol] || [];
      modulosFiltrados = [...modulosDisponibles];
    }
  });

  function buscarModulo() {
    if (busqueda.trim() === "") {
      modulosFiltrados = [...modulosDisponibles];
    } else {
      modulosFiltrados = modulosDisponibles.filter((modulo) =>
        modulo.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
  }

  function salir() {
    cerrarSesion();
    push("/");
  }

  function toggleSidebar() {
    mostrarSidebar = !mostrarSidebar;
  }

  function cerrarSidebar() {
    mostrarSidebar = false;
  }
</script>

<div class="barra-navegacion">
  <div class="contenedor-busqueda">
    <input
      class="busqueda"
      type="text"
      placeholder="Buscar módulos..."
      bind:value={busqueda}
      on:input={buscarModulo}
    />

    {#if !mostrarSidebar}
    <button class="menu-responsive" on:click={toggleSidebar}>
      <img src="../icons/menu-sidebar.png" alt="Menú" />
    </button>
  {/if}

    {#if busqueda && modulosFiltrados.length > 0}
      <ul class="resultados-busqueda">
        {#each modulosFiltrados as modulo}
          <li on:click={() => push(modulo.ruta)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#012B66">
              <path d={modulo.icono} />
            </svg>
            <div class="spacer" style="width: 5px;"></div>
            {modulo.nombre}
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  {#if datosUsuario}
    <button class="boton-salir" on:click={salir}>Cerrar sesión</button>
  {/if}

</div>

{#if mostrarSidebar}
  <div class="overlay" on:click={cerrarSidebar}></div>
  <div class="sidebar">
    <SideBar />
  </div>
{/if}

<style>
  .barra-navegacion {
    background: var(--color-elementos);
    padding: 20px 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--color-borde);
    position: relative;
  }

  .contenedor-busqueda {
    position: relative;
  }

  .busqueda {
    padding: 10px;
    width: 200px;
    border: 1px solid var(--color-borde);
    border-radius: 0.5rem;
    background-color: transparent;
  }

  .resultados-busqueda {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: var(--color-elementos);
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 0;
    margin: 5px 0;
    z-index: 10;
  }

  .resultados-busqueda li {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .resultados-busqueda li:hover {
    background-color: var(--color-hover);
    border-radius: 0.5rem;
  }

  .boton-salir {
    background-color: #2563eb;
    color: white;
    border: none;
    padding: 12px;
    font-weight: bold;
    cursor: pointer;
    width: 150px;
    border-radius: 0.5rem;
  }

  .boton-salir:hover {
    background-color: #1c52c5;
  }

  .menu-responsive {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
  }

  .menu-responsive img {
    width: 40px;
    height: 40px;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 80%;
    max-width: 300px;
    height: 100%;
    background: var(--color-elementos);
    z-index: 10;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out;
  }

  @media (max-width: 800px) {
    .barra-navegacion {
      padding: 20px;
    }

    .busqueda {
      width: 100px;
    }

    .menu-responsive {
      display: block;
    }
  }
</style>
