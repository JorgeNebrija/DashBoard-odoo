<script>
  import NavBar from './../components/NavBar.svelte';
  import inventario from "../../data/inventario.json"; // Importar JSON directamente

  // Asignar los datos del JSON a las variables reactivas
  let inventarioData = inventario;
  let productos = inventario.productos;
  let alertas = inventario.alertas;
  let estadisticas = inventario.estadisticas;
</script>

<!-- Barra de navegación -->
<NavBar />

<section>
  <h1>Inventario</h1>

  <!-- Sección de Estadísticas -->
  <div class="estadisticas">
    <p><strong>Total de Productos:</strong> {estadisticas.totalProductos}</p>
    <p><strong>Stock Bajo:</strong> {estadisticas.stockBajo}</p>
    <p><strong>Valor Total:</strong> ${estadisticas.valorTotal}</p>
  </div>

  <!-- Sección de Alertas -->
  <h2>Alertas</h2>
  <div class="alertas">
    {#each alertas as alerta}
      <div class="alerta {alerta.tipo}">
        <h3>{alerta.titulo}</h3>
        <p>{alerta.descripcion}</p>
      </div>
    {/each}
  </div>

  <!-- Tabla de Productos -->
  <h2>Lista de Productos</h2>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Categoría</th>
        <th>Stock</th>
        <th>Precio</th>
        <th>Estado</th>
      </tr>
    </thead>
    <tbody>
      {#each productos as producto}
        <tr class={producto.estado}>
          <td>{producto.nombre}</td>
          <td>{producto.categoria}</td>
          <td>{producto.stock}</td>
          <td>${producto.precio}</td>
          <td class={producto.estado}>{producto.estado}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<style>
  section {
    padding: 20px;
    max-width: 900px;
    margin: auto;
    font-family: Arial, sans-serif;
  }

  .estadisticas {
    background: #f4f4f4;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 15px;
  }

  h1, h2 {
    text-align: center;
  }

  /* Estilos de Alertas */
  .alertas {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .alerta {
    padding: 10px;
    border-radius: 5px;
    color: white;
  }

  .advertencia {
    background-color: orange;
  }

  .información {
    background-color: blue;
  }

  .éxito {
    background-color: green;
  }

  /* Tabla de Productos */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }

  th {
    background: #333;
    color: white;
  }

  .normal {
    color: green;
  }

  .bajo {
    color: red;
  }

  .excedente {
    color: blue;
  }
</style>
