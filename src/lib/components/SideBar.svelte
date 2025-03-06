<script>
  import { modules, irA } from "../../modules";
</script>

<div class="sidebar">
  <div>
    <h1>Elius</h1>
    <ul>
      {#each modules as module}
        <li on:click={() => irA(module.ruta)}>
          <img
            src={`/icons/${module.icon}`}
            alt=""
            width="24"
            height="24"
          />{module.name}
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .sidebar {
    width: 250px;
    background: #ffffff;
    color: #012b66;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #ddd;
  }

  .sidebar h1 {
    margin-bottom: 20px;
    color: #2563eb;
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
  }

  .sidebar ul li {
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    gap: 5px;
  }

  .sidebar ul li:hover {
    background: #f0f0f0;
  }

  @media (max-width: 800px) {
    .sidebar {
      display: none;
    }
  }
</style>
