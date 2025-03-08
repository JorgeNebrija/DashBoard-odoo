<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import NavBar from "./components/NavBar.svelte";
  import SideBar from "./components/SideBar.svelte";
  import { usuario } from "../lib/store";
  import Sortable from "sortablejs";
  import { modulos } from "../modules";

  let datosUsuario;
  let modulosFiltrados = [];
  let listElement;
  const clave_sesion = "orden_modulo";

  usuario.subscribe((valor) => {
    datosUsuario = valor;

    if (datosUsuario?.rol) {
      const modulosRol = modulos[datosUsuario.rol].filter(
        (modulo) => modulo.nombre !== "Inicio"
      );

      // Validar si hay un orden guardado y que los módulos coincidan
      const ordenGuardado = JSON.parse(sessionStorage.getItem(clave_sesion));

      if (
        ordenGuardado &&
        Array.isArray(ordenGuardado) &&
        ordenGuardado.length === modulosRol.length &&
        ordenGuardado.every((moduloGuardado) =>
          modulosRol.find((modulo) => modulo.nombre === moduloGuardado.nombre)
        )
      ) {
        modulosFiltrados = ordenGuardado;
      } else {
        modulosFiltrados = modulosRol;
      }
    }
  });

  function irA(ruta) {
    push(ruta);
  }

  onMount(() => {
    Sortable.create(listElement, {
      animation: 200,
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="35px"
            viewBox="0 -960 960 960"
            width="35px"
            fill="#012B66"><path d={modulo.icono} /></svg
          >
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
    background: var(--color-fondo);
  }

  .grid {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 30px;
    padding: 50px;
  }

  .module {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--color-elementos);
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
    background: var(--color-hover);
  }

  /* Elimina la transparencia del fantasma */
  .sortable-ghost {
    opacity: 1;
    background-color: var(--color-elementos);
  }

  /* Opcionalmente, añade estilo al ítem que arrastras */
  .sortable-chosen {
    background-color: var(--color-elementos);
    transform: scale(1.05);
  }

  @media (max-width: 800px) {
    .grid {
      padding: 20px;
      gap: 30px;
      margin-top: 30px;
    }
    .module {
      height: 100px;
      width: 25%;
    }
  }
</style>
