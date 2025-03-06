<script>
  import NavBar from './../components/NavBar.svelte';
  import finanzas from "../../data/finanzas.json"; // Importar JSON directamente

  // Asignar los datos del JSON a las variables reactivas
  let finanzasData = finanzas;
  let transacciones = finanzas.transacciones;
  let resumen = finanzas.resumen;
  let estadisticas = finanzas.estadisticas;
</script>

<!-- Página del módulo de Finanzas -->
<NavBar /> <!-- Barra de navegación -->

<section>
  <h1>Finanzas</h1>

  <!-- Resumen Financiero -->
  <div class="resumen">
    <p><strong>Ingresos Totales:</strong> ${resumen.ingresosTotales}</p>
    <p><strong>Gastos Totales:</strong> ${resumen.gastosTotales}</p>
    <p><strong>Balance Neto:</strong> ${resumen.balanceNeto}</p>
  </div>

  <!-- Estadísticas -->
  <div class="estadisticas">
    <p><strong>Ingresos Mensuales:</strong> ${estadisticas.ingresosMensuales}</p>
    <p><strong>Crecimiento:</strong> {estadisticas.crecimiento}%</p>
    <p><strong>Margen de Beneficio:</strong> {estadisticas.margenBeneficio}%</p>
  </div>

  <!-- Lista de Transacciones -->
  <h2>Transacciones</h2>
  <table>
    <thead>
      <tr>
        <th>Fecha</th>
        <th>Descripción</th>
        <th>Monto</th>
        <th>Estado</th>
      </tr>
    </thead>
    <tbody>
      {#each transacciones as transaccion}
        <tr class={transaccion.monto < 0 ? 'gasto' : 'ingreso'}>
          <td>{transaccion.fecha}</td>
          <td>{transaccion.descripcion}</td>
          <td>${transaccion.monto}</td>
          <td class={transaccion.estado === 'completado' ? 'completado' : 'pendiente'}>
            {transaccion.estado}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<style>
  section {
    padding: 20px;
    max-width: 800px;
    margin: auto;
    font-family: Arial, sans-serif;
  }

  .resumen, .estadisticas {
    background: #f4f4f4;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 15px;
  }

  h1 {
    text-align: center;
  }

  h2 {
    margin-top: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
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

  .gasto {
    color: red;
  }

  .ingreso {
    color: green;
  }

  .completado {
    color: blue;
  }

  .pendiente {
    color: orange;
  }
</style>
