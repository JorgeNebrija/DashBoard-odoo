<script>
    import { navigate } from 'svelte-routing';
  
    function volverAInicio() {
      navigate('/');
    }
  </script>
  
  <nav class="barra-navegacion">
    <button class="boton-volver" on:click={volverAInicio}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 12H5"></path>
        <path d="M12 19l-7-7 7-7"></path>
      </svg>
      <span>Volver al inicio</span>
    </button>
  </nav>
  
  <style>
    .barra-navegacion {
      background-color: var(--color-fondo);
      border-bottom: 1px solid var(--color-borde);
      padding: 1rem 2rem;
    }
  
    .boton-volver {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: none;
      border: none;
      color: var(--color-texto);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.375rem;
      transition: all 0.2s;
    }
  
    .boton-volver:hover {
      background-color: var(--color-borde);
    }
  
    .boton-volver span {
      font-weight: 500;
    }
  
    .boton-volver svg {
      width: 20px;
      height: 20px;
    }
  </style>
  