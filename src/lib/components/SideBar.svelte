<script>
  import { onMount } from "svelte";
  import { modulos, irA } from "../../modules";
  import { usuario } from "../store";

  let datosUsuario;
  usuario.subscribe((valor) => (datosUsuario = valor));

  let busqueda = "";
  let modulosDisponibles = [];

  // Al montar el componente, filtramos los módulos según el usuario
  onMount(() => {
    if (datosUsuario?.rol) {
      modulosDisponibles = modulos[datosUsuario.rol] || [];
    }
  });
</script>

<div class="sidebar">
  <div>
    <h1>Elius</h1>
    <ul>
      {#each modulosDisponibles as module}
        <li on:click={() => irA(module.ruta)}>
          <img
            src={`${module.icono}`}
            alt=""
            width="24"
            height="24"
          />{module.nombre}
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .sidebar {
    width: 250px;
    background: #ffffff;
    color: #012b66;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #ddd;
  }

  .sidebar h1 {
    margin-bottom: 20px;
    color: #2563eb;
    text-align: left;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
  }

  .sidebar ul li {
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    gap: 5px;
  }

  .sidebar ul li:hover {
    background: #f0f0f0;
  }

  @media (max-width: 800px) {
    .sidebar {
      display: none;
    }
  }
</style>
