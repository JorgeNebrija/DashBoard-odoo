<script>
  import NavBar from './../components/NavBar.svelte';
  import ventasData from "../../data/ventas.json";
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  let ventas = ventasData.ventas;
  let productosDestacados = ventasData.productosDestacados;
  let estadisticas = ventasData.estadisticas;

  let chartCanvas; // Referencia al canvas del gráfico

  onMount(() => {
    if (chartCanvas) {
      new Chart(chartCanvas, {
        type: "bar",
        data: {
          labels: productosDestacados.map((p) => p.nombre),
          datasets: [
            {
              label: "Ingresos Generados ($)",
              data: productosDestacados.map((p) => p.ingresos),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Permitir que se expanda verticalmente
          plugins: {
            legend: { display: true, position: "top" },
          },
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    }
  });
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

  <!-- Gráfico de Productos Más Vendidos -->
  <h2>Ingresos por Producto</h2>
  <div class="chart-container">
    <canvas bind:this={chartCanvas}></canvas>
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
    max-width: 1000px;
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

  /* Asegurar que el gráfico sea grande */
  .chart-container {
    width: 100%;
    height: 600px; /* Aumentamos el tamaño del gráfico */
  }

  canvas {
    width: 100% !important;
    height: 100% !important;
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
