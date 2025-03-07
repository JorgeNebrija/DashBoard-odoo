<script>
  import NavBar from "./../components/NavBar.svelte";
  import finanzas from "../../data/finanzas.json"; // Importar JSON directamente
  import SideBar from "../components/SideBar.svelte";

  // Asignar los datos del JSON a las variables reactivas
  let transacciones = finanzas.transacciones;
  let resumen = finanzas.resumen;
  let estadisticas = finanzas.estadisticas;
</script>

<section class="container">
  <SideBar  />

  <section class="content">
    <NavBar  />

    <section class="finanzas">
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
          <tr class="encabezado-tabla">
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
  </section>
</section>

<style>
  .container {
    display: flex;
    height: 100vh;
  }

  .finanzas {
    padding: 50px;
    overflow-y: scroll;
  }

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background: #f4f4f4;
  }

  .resumen, .estadisticas {
    padding: 20px;
    background-color: white;
    border-radius: 0.5rem;
    margin-top: 10px;
    color: black;
    margin-bottom: 50px;
  }

  .resumen p, .resumen strong,
  .estadisticas p, .estadisticas strong {
    color: black;
  }

  /* Tabla de Transacciones */
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

  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    color: black;
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
  h1{
    text-align: left;
  }
  
</style>
