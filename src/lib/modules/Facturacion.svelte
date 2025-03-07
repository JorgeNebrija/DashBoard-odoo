<script> 
  import NavBar from './../components/NavBar.svelte';
  import SideBar from './../components/SideBar.svelte';
  import facturacion from "../../data/facturacion.json";

  let estadisticas = facturacion.estadisticas;
  let facturas = facturacion.facturas;
  let pagos = facturacion.pagos;
</script>

<section class="container">
  <SideBar  />

  <section class="content">
    <NavBar  />

    <section class="facturacion">
      <h1>Facturación</h1>

      <!-- Sección de Estadísticas -->
      <div class="estadisticas-rapidas">
        <div class="tarjeta-estadistica">
          <span class="valor-estadistica">{estadisticas.facturasEmitidas}</span>
          <span class="etiqueta-estadistica">Facturas emitidas</span>
        </div>
        <div class="tarjeta-estadistica">
          <span class="valor-estadistica">${estadisticas.cuentasPorCobrar.toLocaleString()}</span>
          <span class="etiqueta-estadistica">Por cobrar</span>
        </div>
        <div class="tarjeta-estadistica">
          <span class="valor-estadistica">{estadisticas.tasaRecaudacion}%</span>
          <span class="etiqueta-estadistica">Tasa de cobro</span>
        </div>
      </div>

      <!-- Lista de Facturas -->
      <h2>Facturas Recientes</h2>
      <div class="contenedor-tabla">
        <table>
          <thead>
            <tr>
              <th>Nº Factura</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {#each facturas as factura}
              <tr>
                <td>{factura.id}</td>
                <td>{factura.cliente}</td>
                <td>{factura.fecha}</td>
                <td>${factura.monto.toLocaleString()}</td>
                <td>
                  <span class="estado {factura.estado}">
                    {factura.estado === 'pagada' ? 'Pagada' : factura.estado === 'pendiente' ? 'Pendiente' : 'Vencida'}
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <!-- Resumen de Pagos -->
      <h2>Resumen de Pagos</h2>
      <div class="lista-resumen">
        <div class="elemento-resumen pagado">
          <span class="titulo-resumen">Pagos recibidos</span>
          <span class="valor-resumen">${pagos.recibidos.toLocaleString()}</span>
        </div>
        <div class="elemento-resumen pendiente">
          <span class="titulo-resumen">Pagos pendientes</span>
          <span class="valor-resumen">${pagos.pendientes.toLocaleString()}</span>
        </div>
        <div class="elemento-resumen vencido">
          <span class="titulo-resumen">Pagos vencidos</span>
          <span class="valor-resumen">${pagos.vencidos.toLocaleString()}</span>
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

  .facturacion {
    padding: 50px;
    overflow-y: scroll;
  }

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background: var(--color-fondo);
  }

  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    text-align: left;
    
  }
  h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    unicode-bidi: isolate;
    text-align: left;

}

  /* Sección de estadísticas rápidas */
  .estadisticas-rapidas {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .tarjeta-estadistica {
    background-color: var(--color-elementos);
    border-radius: 0.5rem;
    padding: 1.5rem;
    flex: 1;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .valor-estadistica {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-texto);
  }

  .etiqueta-estadistica {
    font-size: 0.875rem;
    color: var(--color-texto);
  }

  /* Tabla de Facturas */
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--color-elementos);
    border-radius: 5px;
  }

  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid var(--color-borde);
  }

  th {
    font-weight: 600;
    color: var(--color-texto);
    background: var(--color-encabezado-tabla);
  }

  .estado {
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-weight: 600;
  }

  .pagada { background-color: #10B981; color: white; }
  .pendiente { background-color: #F59E0B; color: rgb(0, 0, 0); }
  .vencida { background-color: #EF4444; color: white; }

  /* Sección de resumen de pagos */
  .lista-resumen {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 20px;
  }

  .elemento-resumen {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: var(--color-elementos);

    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .titulo-resumen {
    font-weight: bold;
    color: var(--color-texto);
  }

  .valor-resumen {
    font-size: 1.2rem;
    font-weight: bold;
  }
</style>
