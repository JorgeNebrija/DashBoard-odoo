<script>
  import NavBar from './components/NavBar.svelte';
  import { push } from "svelte-spa-router";

  // Función para cerrar sesión (redirigir al login)
  function logout() {
    push("/login"); // Redirige al login sin usar Firebase
  }
</script>

<!-- Contenedor Principal -->
<div class="container">
  <!-- Barra lateral -->
  <div class="sidebar">
    <h2>ERP</h2>
    <ul>
      <li>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 4H17V6H7V4Z" fill="white"/>
          <path d="M4 10H20V12H4V10Z" fill="white"/>
          <path d="M10 16H14V18H10V16Z" fill="white"/>
        </svg>
        <span>Menú</span>
      </li>
    </ul>
  </div>

  <!-- Contenido -->
  <div class="content">
    <!-- Barra de navegación -->
    <NavBar />

    <!-- Botón de Cerrar Sesión -->
    <div class="logout-container">
      <button class="logout-button" on:click={logout}>Cerrar sesión</button>
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    height: 100vh;
  }

  .sidebar {
    width: 250px;
    background: #2d2d2d;
    color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  .sidebar h2 {
    margin-bottom: 20px;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
  }

  .sidebar ul li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    cursor: pointer;
  }

  .sidebar ul li:hover {
    background: #444;
  }

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f4f4f4;
  }

  .logout-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logout-button {
    background-color: red;
    color: white;
    font-size: 1.2rem;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .logout-button:hover {
    background-color: darkred;
  }
</style>
