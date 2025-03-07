<script>
  import NavBar from "../components/NavBar.svelte";
  import recursosHumanos from "../../data/recursosHumanos.json"; // Importar JSON directamente
  import SideBar from "../components/SideBar.svelte";
  
  import Sortable from "sortablejs";
  import { onMount } from "svelte";

  // Asignar los datos del JSON a las variables reactivas
  let empleados = recursosHumanos.empleados;
  let eventos = recursosHumanos.eventos;
  let estadisticas = recursosHumanos.estadisticas;

  let eventosArray = eventos;

  let listElement;

  const clave_sesion = "orden_eventos";

  // Si hay datos guardados, los cargamos
  if (sessionStorage.getItem(clave_sesion)) {
    const orden = JSON.parse(sessionStorage.getItem(clave_sesion));
    eventosArray = orden;
  }

  onMount(() => {
    Sortable.create(listElement, {
      animation: 200,
      ghostClass: "sortable-ghost", // Clase que se aplica al ítem fantasma
      chosenClass: "sortable-chosen", // Clase mientras arrastras
      dragClass: "sortable-drag", // Clase opcional para más control
      onEnd: (evt) => {
        const [movedItem] = eventosArray.splice(evt.oldIndex, 1);
       eventosArray.splice(evt.newIndex, 0, movedItem);
        sessionStorage.setItem(clave_sesion, JSON.stringify(eventosArray));
      },
    });
  });
</script>

<section class="container">
  <SideBar />

  <section class="content">
    <NavBar />

    <section class="rrhh">
      <h1>Recursos Humanos</h1>

      <!-- Sección de Estadísticas -->
      <div class="estadisticas">
        <p>
          <strong>Empleados Activos:</strong>
          {estadisticas.empleadosActivos}
        </p>
        <p><strong>Asistencia General:</strong> {estadisticas.asistencia}%</p>
        <p>
          <strong>Evaluaciones Pendientes:</strong>
          {estadisticas.evaluacionesPendientes}
        </p>
      </div>

      <!-- Sección de Eventos -->
      <h2>Próximos Eventos</h2>
      <div class="eventos" bind:this={listElement}>
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
          <tr class="encabezado-tabla">
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
  </section>
</section>

<style>
  .container {
    display: flex;
    height: 100vh;
  }
  .rrhh {
    padding: 50px;
    overflow-y: scroll;
  }

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background: var(--color-fondo);
  }

  .estadisticas {
    padding: 20px;
    background-color: var(--color-elementos);
    border-radius: 0.5rem;
    margin-top: 10px;
    color: var(--color-texto);
    margin-bottom: 50px;
  }
  .estadisticas p,
  .estadisticas strong {
    color: var(--color-texto);
  }

  /* Estilos de Eventos */
  .eventos {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-bottom: 50px;
  }

  .evento {
    display: flex;
    align-items: center;
    background: var(--color-elementos);
    padding: 10px;
    border-radius: 8px;
cursor: grab;
  }

  .evento .fecha .dia,
  .evento .fecha .mes {
    color: var(--color-texto);
  }

  .evento .info h3,
  .evento .info p {
    color: var(--color-texto);
  }

  .fecha {
    background:var(--color-fondo);
    color: var(--color-texto);
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

  .encabezado-tabla th {
    color: var(--color-texto);
    background-color: var(--color-encabezado-tabla);
  }

  th,
  td {
    border: 1px solid var(--color-borde);
    padding: 10px;
    text-align: center;
    color: var(--color-texto);
  }

  .activo {
    color: green;
  }

  .vacaciones {
    color: orange;
  }

  .sortable-ghost {
    opacity: 1;
    background-color: var(--color-elementos);
  }

  .sortable-chosen {
    background-color: var(--color-elementos);
    transform: scale(1.02);
  }
  h1{
    text-align: left;
  }
</style>
