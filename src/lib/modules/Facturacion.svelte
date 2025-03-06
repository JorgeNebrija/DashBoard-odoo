<script> 
  import NavBar from './../components/NavBar.svelte';
  import facturacion from "../../data/facturacion.json";

  let estadisticas = facturacion.estadisticas;
  let facturas = facturacion.facturas;
  let pagos = facturacion.pagos;
</script>

<div class="pagina-modulo">
  <NavBar />
  <div class="contenedor-modulo">
    <header class="encabezado-modulo">
      <h1>Facturación</h1>
      <div class="estadisticas-rapidas">
        <div class="tarjeta-estadistica">
          <div class="contenido-estadistica">
            <span class="valor-estadistica">{estadisticas.facturasEmitidas}</span>
            <span class="etiqueta-estadistica">Facturas emitidas</span>
          </div>
        </div>
        <div class="tarjeta-estadistica">
          <div class="contenido-estadistica">
            <span class="valor-estadistica">${estadisticas.cuentasPorCobrar.toLocaleString()}</span>
            <span class="etiqueta-estadistica">Por cobrar</span>
          </div>
        </div>
        <div class="tarjeta-estadistica">
          <div class="contenido-estadistica">
            <span class="valor-estadistica">{estadisticas.tasaRecaudacion}%</span>
            <span class="etiqueta-estadistica">Tasa de cobro</span>
          </div>
        </div>
      </div>
    </header>

    <div class="contenido-modulo">
      <div class="rejilla-contenido">
        <div class="elemento-rejilla facturas">
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
        </div>

        <div class="elemento-rejilla resumen-pagos">
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
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.pagina-modulo {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
}

.contenedor-modulo {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.encabezado-modulo {
  margin-bottom: 2rem;
}

h1 {
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.estadisticas-rapidas {
  display: flex;
  gap: 1rem;
}

.tarjeta-estadistica {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  flex: 1;
  text-align: center;
}

.valor-estadistica {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
}

.etiqueta-estadistica {
  font-size: 0.875rem;
  color: #6b7280;
}

.rejilla-contenido {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.elemento-rejilla {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

th {
  font-weight: 600;
  color: #1f2937;
  background: #ffffff
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

.lista-resumen {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.elemento-resumen {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: white;
  border: 1px solid #e5e7eb;
}
</style>
