<script>
    import { onMount } from "svelte";
    let empleados = [];
    let error = "";
  
    onMount(async () => {
      try {
        const response = await fetch("/src/data/recursosHumanos.json");
        if (!response.ok) throw new Error("No se pudo cargar los datos");
        empleados = await response.json();
      } catch (err) {
        error = err.message;
      }
    });
  </script>
  
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: left;
    }
    th {
      background-color: #2d2d2d;
      color: white;
    }
    .error {
      color: red;
    }
  </style>
  
  <h2>Recursos Humanos</h2>
  
  {#if error}
    <p class="error">{error}</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Puesto</th>
          <th>Correo</th>
          <th>Teléfono</th>
        </tr>
      </thead>
      <tbody>
        {#each empleados as empleado}
          <tr>
            <td>{empleado.id}</td>
            <td>{empleado.nombre}</td>
            <td>{empleado.puesto}</td>
            <td>{empleado.correo}</td>
            <td>{empleado.telefono}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
  