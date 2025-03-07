<script>
    import { usuario } from "../store";
    import { push } from "svelte-spa-router";
    import { onMount } from "svelte";
  
    export let componente; // Componente protegido
  
    let datosUsuario;
    let cargando = true;
  
    onMount(() => {
      usuario.subscribe((valor) => {
        console.log("Valor del usuario en ProteccionRuta:", valor);
        datosUsuario = valor;
        cargando = false;
  
        if (!datosUsuario) {
          console.log("Usuario no autenticado. Redirigiendo...");
          push("/");
        }
      });
    });
  </script>
  
  {#if cargando}
    <div class="cargando">
      <p>Verificando acceso...</p>
    </div>
  {:else if datosUsuario}
    <svelte:component this={componente} />
  {:else}
    <p>Redirigiendo...</p>
  {/if}
  
  <style>
    .cargando {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-size: 1.2rem;
      color: var(--color-primario);
    }
  </style>
  