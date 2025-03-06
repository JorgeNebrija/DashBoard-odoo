<script>
  import NavBar from './../components/NavBar.svelte';
  import recursosHumanos from "../../data/recursosHumanos.json"; // Importar JSON directamente

  // Asignar los datos del JSON a las variables reactivas
  let empleados = recursosHumanos.empleados;
  let eventos = recursosHumanos.eventos;
  let estadisticas = recursosHumanos.estadisticas;
</script>

<!-- Barra de navegación -->
<NavBar />

<section>
  <h1>Recursos Humanos</h1>

  <!-- Sección de Estadísticas -->
  <div class="estadisticas">
    <p><strong>Empleados Activos:</strong> {estadisticas.empleadosActivos}</p>
    <p><strong>Asistencia General:</strong> {estadisticas.asistencia}%</p>
    <p><strong>Evaluaciones Pendientes:</strong> {estadisticas.evaluacionesPendientes}</p>
  </div>

  <!-- Sección de Eventos -->
  <h2>Próximos Eventos</h2>
  <div class="eventos">
    {#each eventos as evento}
      <div class="evento">
        <div class="fecha">
          <span class="dia">{evento.dia}</span>
          <span class="mes">{evento.mes}</span>
        </div>
        <div class="info">
          <h3>{evento.titulo}</h3>
          <p>{evento.descripcion}</p>
        </div>
      </div>
    {/each}
  </div>

  <!-- Tabla de Empleados -->
  <h2>Lista de Empleados</h2>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Departamento</th>
        <th>Puesto</th>
        <th>Estado</th>
      </tr>
    </thead>
    <tbody>
      {#each empleados as empleado}
        <tr class={empleado.estado}>
          <td>{empleado.id}</td>
          <td>{empleado.nombre}</td>
          <td>{empleado.departamento}</td>
          <td>{empleado.puesto}</td>
          <td class={empleado.estado}>{empleado.estado}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<style>
  section {
    padding: 20px;
    max-width: 900px;
    margin: auto;
    font-family: Arial, sans-serif;
  }

  .estadisticas {
    background: #f4f4f4;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 15px;
  }

  h1, h2 {
    text-align: center;
  }

  /* Estilos de Eventos */
  .eventos {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }

  .evento {
    display: flex;
    align-items: center;
    background: #f8f8f8;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }

  .fecha {
    background: #333;
    color: white;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    min-width: 50px;
    font-weight: bold;
  }

  .dia {
    font-size: 1.5rem;
    display: block;
  }

  .mes {
    font-size: 1rem;
  }

  .info {
    margin-left: 10px;
  }

  /* Tabla de Empleados */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
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

  .activo {
    color: green;
  }

  .vacaciones {
    color: orange;
  }
</style>
