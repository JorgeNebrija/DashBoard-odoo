<script>
  import { push } from "svelte-spa-router";
  import NavBar from "./components/NavBar.svelte";
  import SideBar from "./components/SideBar.svelte";
  import { modules } from "../modules";

  function irA(ruta) {
    push(ruta);
  }

</script>

<div class="container">
  <SideBar />

  <div class="content">
    <NavBar />
    <div class="grid">
      {#each modules as module}
        <div class="module" on:click={irA(module.ruta)}>
          {module.icon}<br />{module.name}
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
