<script>
    import { usuario } from "../store"; // Importamos el store del usuario
    import { push } from "svelte-spa-router";
    import { onMount } from "svelte";
  
    let datosUsuario;
    let cargando = true; // Para manejar el estado de carga
  
    // Verificar el estado del usuario al montar el componente
    onMount(() => {
      usuario.subscribe((valor) => {
        datosUsuario = valor;
        cargando = false;
  
        // Si el usuario no está autenticado, redirigirlo al login
        if (!datosUsuario) {
          push("/login");
        }
      });
    });
  </script>
  
  {#if cargando}
    <!-- Indicador de carga mientras se verifica la sesión -->
    <div class="cargando">
      <p>Verificando acceso...</p>
    </div>
  {:else}
    <!-- Si el usuario está autenticado, se muestra el contenido -->
    <slot />
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
  