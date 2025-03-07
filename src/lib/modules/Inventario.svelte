<script>
  import NavBar from "./../components/NavBar.svelte";
  import inventario from "../../data/inventario.json"; // Importar JSON directamente
  import SideBar from "../components/SideBar.svelte";

  // Asignar los datos del JSON a las variables reactivas
  let productos = inventario.productos;
  let alertas = inventario.alertas;
  let estadisticas = inventario.estadisticas;
</script>

<section class="container">
  <SideBar  />

  <section class="content">
    <NavBar  />

    <section class="inventario">
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
          <tr class="encabezado-tabla">
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
  </section>
</section>

<style>
  .container {
    display: flex;
    height: 100vh;
  }

  .inventario {
    padding: 50px;
    overflow-y: scroll;
  }

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background: #f4f4f4;
  }

  .estadisticas {
    padding: 20px;
    background-color: white;
    border-radius: 0.5rem;
    margin-top: 10px;
    color: black;
    margin-bottom: 50px;
  }
  .estadisticas p,
  .estadisticas strong {
    color: black;
  }

  /* Estilos de Alertas */
  .alertas {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 50px;
  }

  .alerta {
    padding: 10px;
    border-radius: 5px;
    color: white;
  }

  .advertencia {
    background-color:white;
  }

  .información {
    background-color: white;
  }

  .éxito {
    background-color: white; 
  }

  /* Tabla de Productos */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
    background: white;
  }

  .encabezado-tabla th {
    color: black;
    background-color: lightgrey;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    color: black;
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
  h1{
    text-align: left;
  }
</style>
