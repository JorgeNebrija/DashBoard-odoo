<script>
  import { onMount } from "svelte";
  import { modulos, irA } from "../../modules";
  import { usuario } from "../store";
  import Module from "module";

  let datosUsuario;
  usuario.subscribe((valor) => (datosUsuario = valor));

  let busqueda = "";
  let modulosDisponibles = [];

  $: modulosDisponibles = modulos[datosUsuario.rol];
  // Al montar el componente, filtramos los módulos según el usuario
  onMount(() => {
    if (datosUsuario?.rol) {
      modulosDisponibles = modulos[datosUsuario.rol] || [];
    }
  });

  function cambiarTema() {
    let root = document.documentElement; // Accede a :root
    let temaActual = getComputedStyle(root)
      .getPropertyValue("--color-fondo")
      .trim(); // Obtiene el color actual

    if (temaActual === "#f4f4f4") {
      // Cambiar al tema oscuro
      root.style.setProperty("--color-fondo", "black");
      root.style.setProperty("--color-elementos", "#1e1e1e");
      root.style.setProperty("--color-texto", "white");
      root.style.setProperty("--color-hover", "#020202");
      root.style.setProperty("--color-borde", "grey");
      root.style.setProperty("--color-encabezado-tabla", "grey");
    } else {
      // Cambiar al tema claro
      root.style.setProperty("--color-fondo", "#f4f4f4");
      root.style.setProperty("--color-elementos", "white");
      root.style.setProperty("--color-texto", "#012B66");
      root.style.setProperty("--color-hover", "#f0f0f0");
      root.style.setProperty("--color-borde", "#ddd");
      root.style.setProperty("--color-encabezado-tabla", "white");
    }
  }
</script>

<div class="sidebar">
  <div>
    <a href="/inicio#/inicio">
      <img
        src="/Elius-logo-removebg-preview.png"
        alt=""
        width="100"
        height="50"
      /></a
    >

    <ul>
      {#each modulosDisponibles as module}
        <li on:click={() => irA(module.ruta)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#012B66"><path d={module.icono} /></svg
          >
          {module.nombre}
        </li>
      {/each}
    </ul>
  </div>
  <button on:click={() => cambiarTema()} class="boton-tema">Cambiar Tema</button
  >
</div>

<style>
  .sidebar {
    width: 200px;
    background: var(--color-elementos);
    color: var(--color-texto);
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid var(--color-borde);
  }

  .boton-tema {
    background-color: transparent;
    border: 1px var(--color-texto) solid;
    padding: 10px;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: bold;
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
    color: #2563eb;
    font-weight: bold;
  }

  .sidebar ul li:hover svg {
    fill: #2563eb;
  }

  @media (max-width: 800px) {
    .sidebar {
      display: none;
    }
  }
</style>