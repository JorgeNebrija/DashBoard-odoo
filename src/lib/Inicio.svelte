<script>
    import { onMount } from "svelte";
  
    let user = "Usuario";
    let modules = [
      { name: "Compras", icon: "🛒" },
      { name: "Contabilidad", icon: "📑" },
      { name: "Finanzas", icon: "💰" },
      { name: "Inventario", icon: "📦" },
      { name: "Ventas", icon: "📊" }
    ];
  </script>
  
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
      background: #f4f4f4;
    }
    .header {
      background: white;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ddd;
    }
    .search {
      padding: 8px;
      width: 200px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 20px;
      padding: 20px;
    }
    .module {
      background: white;
      padding: 20px;
      text-align: center;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    }
    .module:hover {
      background: #e0e0e0;
    }
  </style>
  
  <div class="container">
    <div class="sidebar">
      <h2>Odoo</h2>
      <ul>
        {#each modules as module}
          <li>{module.icon} {module.name}</li>
        {/each}
      </ul>
    </div>
    <div class="content">
      <div class="header">
        <input class="search" type="text" placeholder="Buscar..." />
        <span>{user}</span>
      </div>
      <div class="grid">
        {#each modules as module}
          <div class="module">{module.icon}<br />{module.name}</div>
        {/each}
      </div>
    </div>
  </div>
  