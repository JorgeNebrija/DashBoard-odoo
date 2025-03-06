<script>
  import { push } from 'svelte-spa-router';

  function volverAInicio() {
    push('/inicio'); // Usamos push de svelte-spa-router para navegar
  }

  function logout() {
    push('/'); // Redirige al login o página de inicio
  }
</script>

  <div class="header">
    <input class="search" type="text" placeholder="Buscar..." />
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
  }
  
  .search {
    padding: 10px;
    width: 200px;
    border: 1px solid #ddd;
    border-radius: 0.5rem;

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
</style>