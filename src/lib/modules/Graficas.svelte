<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import NavBar from "./../components/NavBar.svelte";
  import SideBar from "./../components/SideBar.svelte";
  import facturacion from "../../data/facturacion.json";
  import finanzas from "../../data/finanzas.json";
  import ventas from "../../data/ventas.json";
  import inventario from "../../data/inventario.json";
  import recursosHumanos from "../../data/recursosHumanos.json";

  let dataset = "facturacion";
  let datos = facturacion.estadisticas;
  let chartInstance;
  let chartCanvas;

  const datasets = {
    facturacion: facturacion.estadisticas,
    finanzas: finanzas.estadisticas,
    ventas: ventas.estadisticas,
    inventario: inventario.estadisticas,
    recursosHumanos: recursosHumanos.estadisticas,
  };

  function cambiarDataset(tipo) {
    if (datasets[tipo]) {
      dataset = tipo;
      datos = datasets[tipo];
      renderChart();
    }
  }

  function renderChart() {
    if (chartInstance) {
      chartInstance.destroy();
    }
    chartInstance = new Chart(chartCanvas, {
      type: "line",
      data: {
        labels: Object.keys(datos),
        datasets: [{
          label: dataset,
          data: Object.values(datos),
          backgroundColor: "#2563eb",
          borderColor: "#1c52c5",
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }

  onMount(() => {
    renderChart();
  });
</script>

<section class="container">
  <SideBar />

  <section class="content">
    <NavBar />

    <section class="dashboard">
      <h1>Dashboard de Estadísticas</h1>

      <div class="botones-filtro">
        <button on:click={() => cambiarDataset("facturacion")}>Facturación</button>
        <button on:click={() => cambiarDataset("finanzas")}>Finanzas</button>
        <button on:click={() => cambiarDataset("ventas")}>Ventas</button>
        <button on:click={() => cambiarDataset("inventario")}>Inventario</button>
        <button on:click={() => cambiarDataset("recursosHumanos")}>Recursos Humanos</button>
      </div>

      <div class="grafico-container">
        <canvas bind:this={chartCanvas}></canvas>
      </div>
    </section>
  </section>
</section>

<style>
  .container {
    display: flex;
    height: 100vh;
  }
h1{
  padding: 20px;
}
  .dashboard {
    padding: 50px;
    overflow-y: scroll;
  }

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background: #f4f4f4;
  }

  .botones-filtro {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  .botones-filtro button {
    padding: 10px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .grafico-container {
    width: 100%;
    max-width: 600px;
    height: 300px;
    margin: auto;
    background-color: white;

  }
</style>
