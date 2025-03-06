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
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
  }
  
  .search {
    padding: 8px;
    width: 200px;
  }
  .logout-button {
    background-color: red;
    color: white;
    font-size: 1rem;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
   
  }
  
  .logout-button:hover {
    background-color: darkred;
  }
</style>