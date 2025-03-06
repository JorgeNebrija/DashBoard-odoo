<script>
    import{modules } from "../../modules"
</script>
<div class="sidebar">
    <div>
      <h2>Elius</h2>
      <ul>
        {#each modules as module}
          <li>{module.icon} {module.name}</li>
        {/each}
      </ul>
    </div>
    </div>
    <style>
        .sidebar {
    width: 250px;
    background: #2d2d2d;
    color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    </style>