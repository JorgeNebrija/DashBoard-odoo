<script>
  import { onMount } from "svelte";
  import { modulos, irA } from "../../modules";
  import { cerrarSesion } from "../firebase";

  import { usuario, btnSideBarMovilActivo } from "../store";
  import { push } from "svelte-spa-router";

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

  usuario.subscribe((valor) => (datosUsuario = valor));

  function salir() {
    cerrarSesion();
    push("/");
  }

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
  <div class="usuario">
    {#if datosUsuario}
      <p
        style="margin-right: 10px; display: flex; flex-direction:row; align-items:center; gap:5px"
      >
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

<style>
  .sidebar {
    background: var(--color-elementos);
    color: var(--color-texto);
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .usuario {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    margin-top: 30px;
  }

  .boton-tema {
    background-color: transparent;
    border: 1px var(--color-texto) solid;
    padding: 10px;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: bold;
    width: 200px;
    margin-top: 20px;
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
  .boton-salir {
    background-color: #2563eb;
    color: white;
    border: none;
    padding: 7px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.5rem;
  }

  .boton-salir:hover {
    background-color: #1c52c5;
  }
</style>
