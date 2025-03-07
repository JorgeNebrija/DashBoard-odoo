<script>
  import { usuario } from "../store";
  import { push } from "svelte-spa-router";

  export let componente; // Componente protegido

  $: {
    if ($usuario === null) {
      console.log("Usuario no autenticado. Redirigiendo...");
      push("/login"); // Redirigir a la página de login
    }
  }
</script>

{#if $usuario}
  <svelte:component this={componente} />
{:else}
  <div class="cargando">
    <p>Verificando acceso...</p>
  </div>
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
