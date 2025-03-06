<script>
  import NavBar from './../components/NavBar.svelte';
  import facturacion from "../../data/facturacion.json"; // Importar JSON directamente

  // Asignar los datos del JSON a las variables reactivas
  let estadisticas = facturacion.estadisticas;
  let facturas = facturacion.facturas;
  let pagos = facturacion.pagos;
</script>

<!-- Página del módulo de facturación -->
<div class="pagina-modulo">
  <NavBar /> <!-- Barra de navegación -->

  <div class="contenedor-modulo">
    <header class="encabezado-modulo">
      <h1>Facturación</h1>

      <!-- Tarjetas con estadísticas clave de facturación -->
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
        
        <!-- Tabla de facturas recientes -->
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
                      <!-- Estado de la factura con clases dinámicas -->
                      <span class="estado {factura.estado}">
                        {factura.estado === 'pagada' ? 'Pagada' : 
                         factura.estado === 'pendiente' ? 'Pendiente' : 'Vencida'}
                      </span>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Resumen de pagos -->
        <div class="elemento-rejilla resumen-pagos">
          <h2>Resumen de Pagos</h2>
          <div class="lista-resumen">
            
            <!-- Pagos recibidos -->
            <div class="elemento-resumen">
              <div class="icono-resumen pagado"></div>
              <div class="contenido-resumen">
                <span class="titulo-resumen">Pagos recibidos</span>
                <span class="valor-resumen">${pagos.recibidos.toLocaleString()}</span>
              </div>
            </div>

            <!-- Pagos pendientes -->
            <div class="elemento-resumen">
              <div class="icono-resumen pendiente"></div>
              <div class="contenido-resumen">
                <span class="titulo-resumen">Pagos pendientes</span>
                <span class="valor-resumen">${pagos.pendientes.toLocaleString()}</span>
              </div>
            </div>

            <!-- Pagos vencidos -->
            <div class="elemento-resumen">
              <div class="icono-resumen vencido"></div>
              <div class="contenido-resumen">
                <span class="titulo-resumen">Pagos vencidos</span>
                <span class="valor-resumen">${pagos.vencidos.toLocaleString()}</span>
              </div>
            </div>

          </div>
        </div> <!-- Fin del resumen de pagos -->
        
      </div>
    </div>
  </div>
</div>

<style>
  .pagina-modulo {
    height: 100vh;
    display: flex;
    flex-direction: column;
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
    color: var(--color-texto);
    margin-bottom: 1.5rem;
  }

  .estadisticas-rapidas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .tarjeta-estadistica {
    background-color: var(--color-fondo);
    border: 1px solid var(--color-borde);
    border-radius: 0.5rem;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .contenido-estadistica {
    display: flex;
    flex-direction: column;
  }

  .valor-estadistica {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-texto);
  }

  .etiqueta-estadistica {
    font-size: 0.875rem;
    color: var(--color-texto);
    opacity: 0.8;
  }

  .rejilla-contenido {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }

  .elemento-rejilla {
    background-color: var(--color-fondo);
    border: 1px solid var(--color-borde);
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
    border-bottom: 1px solid var(--color-borde);
  }

  .estado {
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }

  .pagado {
    background-color: #10B981;
    color: white;
  }

  .pendiente {
    background-color: #F59E0B;
    color: white;
  }

  .vencido {
    background-color: #EF4444;
    color: white;
  }
</style>
