<script>
  import NavBar from "./../components/NavBar.svelte";
  import ventasData from "../../data/ventas.json"; // Importar JSON directamente
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import SideBar from "../components/SideBar.svelte";

  // Asignar los datos del JSON a las variables reactivas
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
              backgroundColor: "#2563eb",
              borderColor: "transparent",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
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

<section class="container">
  <SideBar />

  <section class="content">
    <NavBar />

    <section class="ventas">
      <h1>Ventas</h1>

      <!-- Sección de Estadísticas -->
      <div class="estadisticas">
        <p>
          <strong>Ventas Mensuales:</strong>
          {estadisticas.ventasMensuales}€
        </p>
        <p><strong>Nuevos Clientes:</strong> {estadisticas.nuevosClientes}</p>
        <p><strong>Crecimiento:</strong> {estadisticas.crecimiento}%</p>
      </div>

      <!-- Gráfico de Productos Más Vendidos -->
      <h2>Ingresos por Producto</h2>
      <div class="contenedor-grafico">
        <canvas bind:this={chartCanvas}></canvas>
      </div>

      <!-- Tabla de Ventas -->
      <h2>Lista de Ventas</h2>
      <table>
        <thead>
          <tr class="encabezado-tabla">
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
  </section>
</section>

<style>
  .container {
    display: flex;
    height: 100vh;
  }

  .estadisticas {
    padding: 20px;
    background-color: white;
    border-radius: 0.5rem;
    margin-top: 10px;
    margin-bottom: 50px;
    color: black;
  }

  .estadisticas p,
  .estadisticas strong {
    color: black;
  }

  .ventas {
    padding: 50px;
    overflow-y: scroll;
  }

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background: #f4f4f4;
  }

  .encabezado-tabla th {
    background-color: lightgray;
    color: black;
  }

  table {
    border-radius: 0.5rem;
  }

  .contenedor-grafico {
    padding: 20px;
    display: flex;
    justify-content: left;
    height: 300px;
    margin-top: 10px;
    margin-bottom: 50px;
  }

  h1,
  h2 {
    text-align: left;
  }

  canvas {
    display: block;
    max-width: 100%;
  }

  /* Tabla de Ventas */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    color: black;
  }

  .completado {
    color: green;
  }

  .pendiente {
    color: red;
  }
</style>
