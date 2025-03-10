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
  import { textoFiltrado } from "../store";

  let dataset = "facturacion";
  let datos = facturacion.estadisticas;
  let chartInstanceLine;
  let chartInstancePie;
  let chartCanvasLine;
  let chartCanvasPie;

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
      renderCharts();
    }
  }

  function cambiarTextoFiltrado(texto) {
    textoFiltrado.set(texto);
  }

  function renderCharts() {
    // Destruir instancias anteriores si existen
    if (chartInstanceLine) chartInstanceLine.destroy();
    if (chartInstancePie) chartInstancePie.destroy();

    // Gráfico de línea
    chartInstanceLine = new Chart(chartCanvasLine, {
      type: "bar",
      data: {
        labels: Object.keys(datos),
        datasets: [
          {
            label: dataset,
            data: Object.values(datos),
            backgroundColor: ["#2563eb", "#1c52c5", "#3b82f6"],
            borderColor: "transparent",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    // Gráfico circular (pie)
    chartInstancePie = new Chart(chartCanvasPie, {
      type: "pie",
      data: {
        labels: Object.keys(datos),
        datasets: [
          {
            label: dataset,
            data: Object.values(datos),
            backgroundColor: [
              "#2563eb",
              "#1c52c5",
              "#3b82f6",
              "#60a5fa",
              "#93c5fd",
              "#bfdbfe",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  onMount(() => {
    renderCharts();
  });
</script>

<section class="container">
  <SideBar />

  <section class="content">
    <NavBar />

    <section class="dashboard">
      <h1>Estadísticas de {$textoFiltrado}</h1>

      <div class="botones-filtro">
        <button
          on:click={() => {
            cambiarDataset("facturacion"), cambiarTextoFiltrado("Facturación");
          }}
        >
          Facturación
        </button>
        <button
          on:click={() => {
            cambiarDataset("finanzas"), cambiarTextoFiltrado("Finanzas");
          }}
        >
          Finanzas
        </button>
        <button
          on:click={() => {
            cambiarDataset("ventas"), cambiarTextoFiltrado("Ventas");
          }}
        >
          Ventas
        </button>
        <button
          on:click={() => {
            cambiarDataset("inventario"), cambiarTextoFiltrado("Inventario");
          }}
        >
          Inventario
        </button>
        <button
          on:click={() => {
            cambiarDataset("recursosHumanos"),
              cambiarTextoFiltrado("Recursos Humanos");
          }}
        >
          Recursos Humanos
        </button>
      </div>

      <div class="graficas">
        <div class="grafico-container">
          <canvas bind:this={chartCanvasLine}></canvas>
        </div>

        <div class="grafico-container">
          <canvas bind:this={chartCanvasPie}></canvas>
        </div>
      </div>
    </section>
  </section>
</section>

<style>
  .container {
    display: flex;
    height: 100vh;
  }
  h1 {
  }
  .dashboard {
    padding: 50px;
    overflow-y: scroll;
  }

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: left;
    background: var(--color-fondo);
  }

  .botones-filtro {
    display: flex;
    gap: 15px;
    margin-top: 20px;
    margin-bottom: 50px;
  }
  .botones-filtro button {
    padding: 10px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .graficas {
    display: flex;
    flex-direction: row;

    gap: 20px;
  }

  .grafico-container {
    width: 100%;
    max-width: 600px;
    height: 350px;
    padding: 20px;
    background-color: var(--color-elementos);
    border-radius: 0.5rem;
  }
</style>
