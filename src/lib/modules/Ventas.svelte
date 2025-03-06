<script>
  import NavBar from './../components/NavBar.svelte';
  import ventasData from "../../data/ventas.json"; // Importar JSON directamente

  // Asignar los datos del JSON a las variables reactivas
  let ventas = ventasData.ventas;
  let productosDestacados = ventasData.productosDestacados;
  let estadisticas = ventasData.estadisticas;
</script>

<!-- Barra de navegación -->
<NavBar />

<section>
  <h1>Ventas</h1>

  <!-- Sección de Estadísticas -->
  <div class="estadisticas">
    <p><strong>Ventas Mensuales:</strong> ${estadisticas.ventasMensuales}</p>
    <p><strong>Nuevos Clientes:</strong> {estadisticas.nuevosClientes}</p>
    <p><strong>Crecimiento:</strong> {estadisticas.crecimiento}%</p>
  </div>

  <!-- Productos Destacados -->
  <h2>Productos Más Vendidos</h2>
  <div class="productos-destacados">
    {#each productosDestacados as producto}
      <div class="producto">
        <h3>{producto.nombre}</h3>
        <p>Ventas: {producto.ventas}</p>
        <p>Ingresos: ${producto.ingresos}</p>
      </div>
    {/each}
  </div>

  <!-- Tabla de Ventas -->
  <h2>Lista de Ventas</h2>
  <table>
    <thead>
      <tr>
        <th>Fecha</th>
        <th>Cliente</th>
        <th>Producto</th>
        <th>Monto</th>
        <th>Estado</th>
      </tr>
    </thead>
    <tbody>
      {#each ventas as venta}
        <tr class={venta.estado}>
          <td>{venta.fecha}</td>
          <td>{venta.cliente}</td>
          <td>{venta.producto}</td>
          <td>${venta.monto}</td>
          <td class={venta.estado}>{venta.estado}</td>
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

  /* Estilos de Productos Destacados */
  .productos-destacados {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-bottom: 20px;
  }

  .producto {
    background: #f8f8f8;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }

  /* Tabla de Ventas */
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

  .completado {
    color: green;
  }

  .pendiente {
    color: red;
  }
</style>
