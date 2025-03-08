<script>
  import NavBar from "./../components/NavBar.svelte";
  import SideBar from "./../components/SideBar.svelte";
  import fabricacion from "../../data/fabricacion.json";

  let estadisticas = fabricacion.estadisticas;
  let ordenesProduccion = fabricacion.ordenesProduccion;
  let materialesConsumidos = fabricacion.materialesConsumidos;
</script>

<section class="container">
  <SideBar />

  <section class="content">
    <NavBar />

    <section class="fabricacion">
      <h1>Fabricación</h1>

      <!-- Sección de Estadísticas -->
      <div class="estadisticas-rapidas">
        <div class="tarjeta-estadistica">
          <span class="valor-estadistica">{estadisticas.ordenesTotales}</span>
          <span class="etiqueta-estadistica">Órdenes Totales</span>
        </div>
        <div class="tarjeta-estadistica">
          <span class="valor-estadistica"
            >{estadisticas.ordenesFinalizadas}</span
          >
          <span class="etiqueta-estadistica">Órdenes Finalizadas</span>
        </div>
        <div class="tarjeta-estadistica">
          <span class="valor-estadistica"
            >{estadisticas.productosFabricados}</span
          >
          <span class="etiqueta-estadistica">Productos Fabricados</span>
        </div>
        <div class="tarjeta-estadistica">
          <span class="valor-estadistica">
            ${estadisticas.costoTotalProduccion.toLocaleString()}
          </span>
          <span class="etiqueta-estadistica">Costo Total</span>
        </div>
      </div>

      <!-- Lista de Órdenes de Producción -->
      <h2>Órdenes Recientes</h2>
      <div class="contenedor-tabla">
        <table>
          <thead>
            <tr>
              <th>Nº Orden</th>
              <th>Producto</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Cantidad</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {#each ordenesProduccion as orden}
              <tr>
                <td>{orden.id}</td>
                <td>{orden.producto}</td>
                <td>{orden.fechaInicio}</td>
                <td>{orden.fechaFin ? orden.fechaFin : "En curso"}</td>
                <td>{orden.cantidad}</td>
                <td>
                  <span class="estado {orden.estado}">
                    {orden.estado === "finalizada"
                      ? "Finalizada"
                      : orden.estado === "en proceso"
                        ? "En Proceso"
                        : "Pendiente"}
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <!-- Resumen de Materiales Consumidos -->
      <h2>Materiales Consumidos</h2>
      <div class="contenedor-tabla">
        <table>
          <thead>
            <tr>
              <th>Orden</th>
              <th>Material</th>
              <th>Cantidad Usada</th>
              <th>Unidad</th>
            </tr>
          </thead>
          <tbody>
            {#each materialesConsumidos as material}
              <tr>
                <td>{material.ordenId}</td>
                <td>{material.material}</td>
                <td>{material.cantidadUsada}</td>
                <td>{material.unidad}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>
  </section>
</section>

<style>
  /* Contenedor principal */
  .container {
    display: flex;
    height: 100vh;
    width: 100vw;
  }

  .fabricacion {
    padding: 50px;
    overflow-y: auto;
  }

  .content {
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
    font-size: 1.5em;
    margin: 1.5rem 0 1rem;
    font-weight: bold;
    text-align: left;
  }

  /* Estadísticas rápidas */
  .estadisticas-rapidas {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .tarjeta-estadistica {
    background-color: var(--color-elementos);
    border: 1px solid #e5e7eb;
    width: auto;
    padding: 20px;
    border-radius: 0.5rem;
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
    color: #6b7280;
  }

  /* Tabla */
  .contenedor-tabla {
    margin-top: 1rem;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--color-elementos);
    border-radius: 5px;
  }

  th,
  td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
    white-space: nowrap;
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

  .finalizada {
    background-color: #10b981;
    color: white;
  }
  .pendiente {
    background-color: #f59e0b;
    color: rgb(0, 0, 0);
  }
  .en\.proceso {
    background-color: #3b82f6;
    color: white;
  }

  @media (max-width: 800px) {
    .content {
      width: 100vw;
    }
    .fabricacion {
      padding: 20px;
    }

    /* Asegura que las tarjetas de estadísticas ocupen el 100% */
    .estadisticas-rapidas {
      flex-direction: column;
      gap: 10px;
    }

    .tarjeta-estadistica {
      
    }

    .contenedor-tabla {
      border-radius: 8px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1); /* Indica que hay más contenido desplazable */
    }

    table {
      /* Evita que las columnas se colapsen */
      font-size: 0.875rem;
    }

    th,
    td {
      padding: 0.5rem;
      white-space: nowrap;
    }
  }
</style>
