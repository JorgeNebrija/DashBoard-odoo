<script>
  import { push } from "svelte-spa-router";
  import { modules, irA } from "../../modules"; // Importamos los módulos y la función de navegación
  import { onMount } from "svelte";

  let searchQuery = ""; // Variable reactiva para almacenar el texto de búsqueda
  let filteredModules = [...modules]; // Inicialmente, mostramos todos los módulos

  // Función para filtrar módulos según la búsqueda
  function buscarModulo() {
    if (searchQuery.trim() === "") {
      filteredModules = [...modules]; // Si el campo está vacío, mostramos todos
    } else {
      filteredModules = modules.filter((modulo) =>
        modulo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }

  function logout() {
    push("/"); // Redirige al login o página de inicio
  }
</script>

<div class="header">
  <div class="search-container">
    <input
      class="search"
      type="text"
      placeholder="Buscar módulos..."
      bind:value={searchQuery}
      on:input={buscarModulo}
    />

    <!-- Resultados de búsqueda -->
    {#if searchQuery && filteredModules.length > 0}
      <ul class="search-results">
        {#each filteredModules as modulo}
          <li on:click={() => irA(modulo.ruta)}>
            <img src={`/icons/${modulo.icon}`} alt={modulo.name} class="icon" />
            {modulo.name}
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  <button class="logout-button" on:click={logout}>Cerrar sesión</button>
</div>

<style>
  .header {
    background: white;
    padding: 20px 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    position: relative;
  }

  .search-container {
    position: relative;
  }

  .search {
    padding: 10px;
    width: 200px;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
  }

  /* Estilos para los resultados de búsqueda */
  .search-results {
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

  .search-results li {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .search-results li:hover {
    background: #f3f4f6;
  }

  .search-results img.icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .logout-button {
    background-color: #2563eb;
    color: white;
    border: none;
    padding: 10px;
    font-weight: bold;
    cursor: pointer;
    width: 150px;
    border-radius: 0.5rem;
  }

  .logout-button:hover {
    background-color: #1c52c5;
  }

  @media (max-width: 800px) {
    .header {
      padding: 20px;
    }

    .search {
      width: 100px;
    }
  }
</style>
