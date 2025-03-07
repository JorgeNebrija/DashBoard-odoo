<script>
  import { push } from "svelte-spa-router";
  import { usuario } from "../store"; // Importamos el usuario autenticado
  import { cerrarSesion } from "../../lib/firebase"; // Función para cerrar sesión
  import { onMount } from "svelte";

  let datosUsuario;
  usuario.subscribe((valor) => (datosUsuario = valor));

  let busqueda = "";
  let modulosDisponibles = [];
  let modulosFiltrados = [];

  

  // Filtrar módulos en la barra de búsqueda
  function buscarModulo() {
    if (busqueda.trim() === "") {
      modulosFiltrados = [...modulosDisponibles];
    } else {
      modulosFiltrados = modulosDisponibles.filter((modulo) =>
        modulo.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }
  }

  // Cerrar sesión
  function salir() {
    cerrarSesion();
    push("/");
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

    <!-- Resultados de búsqueda -->
    {#if busqueda && modulosFiltrados.length > 0}
      <ul class="resultados-busqueda">
        {#each modulosFiltrados as modulo}
          <li on:click={() => push(modulo.ruta)}>
            <img src={`/icons/${modulo.icono}`} alt={modulo.nombre} class="icono" />
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

<style>
  .barra-navegacion {
    background: white;
    padding: 20px 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    position: relative;
  }

  .contenedor-busqueda {
    position: relative;
  }

  .busqueda {
    padding: 10px;
    width: 200px;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
  }

  /* Estilos para los resultados de búsqueda */
  .resultados-busqueda {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
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
    background: #f3f4f6;
  }

  .resultados-busqueda img.icono {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .boton-salir {
    background-color: #2563eb;
    color: white;
    border: none;
    padding: 10px;
    font-weight: bold;
    cursor: pointer;
    width: 150px;
    border-radius: 0.5rem;
  }

  .boton-salir:hover {
    background-color: #1c52c5;
  }

  @media (max-width: 800px) {
    .barra-navegacion {
      padding: 20px;
    }

    .busqueda {
      width: 100px;
    }
  }
</style>
