<script>
  import { push } from "svelte-spa-router";
  import NavBar from "./components/NavBar.svelte";
  import SideBar from "./components/SideBar.svelte";
  import { modules, irA } from "../modules";


</script>

<div class="container">
  <SideBar />

  <div class="content">
    <NavBar />
    <div class="grid">
      {#each modules.slice(0, 5) as module}
        <div class="module" on:click={()=>irA(module.ruta)}> <img src={`/icons/${module.icon}`} alt="" width="24" height="24"> <br />{module.name}
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
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    padding: 50px;

  }

  .module {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    width: 15%;
    height: 150px;
    padding: 20px;
    text-align: center;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  }
  .module img{
    width: 35px;
    height: 35px;
  }

  .module:hover {
    background:  #f0f0f0;
  }
</style>
