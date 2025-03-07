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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#012B66"><path d={modulo.icono} /></svg
            >

 
            <div class="spacer" style="width: 5px;"></div>
            {modulo.nombre}
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <div style="display: flex; flex-direction:row; align-items:center" class="usuario">
    {#if datosUsuario}
      <p style="margin-right: 10px; display: flex; flex-direction:row; align-items:center; gap:5px">
        {datosUsuario.correo}
        {#if datosUsuario.rol !== "empleado"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#0D99FF"

            ><path
              d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
            /></svg
          >{/if}
      </p>
      <button class="boton-salir" on:click={salir}>Cerrar sesión</button>
    {/if}
  </div>
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

  }

  .contenedor-busqueda {
    position: relative;
  }

  .busqueda {
    padding: 10px;
   max-width: 200px;
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
    color: #2563eb;
    font-weight: bold;
  }

  .resultados-busqueda li:hover svg {
    fill: #2563eb;
  }
  .resultados-busqueda img.icono {
    width: 20px;
    height: 20px;
    margin-right: 10px;
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
      padding: 20px 20px;
    }

    .busqueda {
      width: 100px;
    }

    .menu-responsive {
      display: block;
    }
  }
</style>
