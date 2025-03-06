<script>
  import { FileText, CreditCard, Receipt } from 'lucide-svelte';
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
          <FileText size={24} />
          <div class="contenido-estadistica">
            <span class="valor-estadistica">{estadisticas.facturasEmitidas}</span>
            <span class="etiqueta-estadistica">Facturas emitidas</span>
          </div>
        </div>
        <div class="tarjeta-estadistica">
          <CreditCard size={24} />
          <div class="contenido-estadistica">
            <span class="valor-estadistica">${estadisticas.cuentasPorCobrar.toLocaleString()}</span>
            <span class="etiqueta-estadistica">Por cobrar</span>
          </div>
        </div>
        <div class="tarjeta-estadistica">
          <Receipt size={24} />
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
            <div class="elemento-resumen">
              <div class="icono-resumen pagado">
                <CreditCard size={20} />
              </div>
              <div class="contenido-resumen">
                <span class="titulo-resumen">Pagos recibidos</span>
                <span class="valor-resumen">${pagos.recibidos.toLocaleString()}</span>
              </div>
            </div>
            <div class="elemento-resumen">
              <div class="icono-resumen pendiente">
                <FileText size={20} />
              </div>
              <div class="contenido-resumen">
                <span class="titulo-resumen">Pagos pendientes</span>
                <span class="valor-resumen">${pagos.pendientes.toLocaleString()}</span>
              </div>
            </div>
            <div class="elemento-resumen">
              <div class="icono-resumen vencido">
                <Receipt size={20} />
              </div>
              <div class="contenido-resumen">
                <span class="titulo-resumen">Pagos vencidos</span>
                <span class="valor-resumen">${pagos.vencidos.toLocaleString()}</span>
              </div>
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

.tarjeta-estadistica svg {
  color: var(--color-primario);
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

th {
  font-weight: 600;
  color: var(--color-texto);
  opacity: 0.8;
}

.estado {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.pagada {
  background-color: #10B981;
  color: white;
}

.pendiente {
  background-color: #F59E0B;
  color: white;
}

.vencida {
  background-color: #EF4444;
  color: white;
}

.lista-resumen {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.elemento-resumen {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--color-fondo);
  border: 1px solid var(--color-borde);
}

.icono-resumen {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.icono-resumen.pagado {
  background-color: rgba(16, 185, 129, 0.1);
}

.icono-resumen.pagado svg {
  color: #10B981;
}

.icono-resumen.pendiente {
  background-color: rgba(245, 158, 11, 0.1);
}

.icono-resumen.pendiente svg {
  color: #F59E0B;
}

.icono-resumen.vencido {
  background-color: rgba(239, 68, 68, 0.1);
}

.icono-resumen.vencido svg {
  color: #EF4444;
}

.contenido-resumen {
  display: flex;
  flex-direction: column;
}

.titulo-resumen {
  font-size: 0.875rem;
  color: var(--color-texto);
  opacity: 0.8;
}

.valor-resumen {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-texto);
}


</style>