<script>
  import { autenticacion, baseDeDatos, signInWithEmailAndPassword, getDoc, doc } from "../lib/firebase";
  import { push } from "svelte-spa-router";
  import { usuario } from "../lib/store";
  
  let correo = "";
  let contrasena = "";
  let error = false;

  async function validarDatos() {
    try {
      const credencialesUsuario = await signInWithEmailAndPassword(autenticacion, correo, contrasena);
      const usuarioActual = credencialesUsuario.user;

      // Obtener el rol del usuario desde Firestore
      const referenciaUsuario = doc(baseDeDatos, "usuarios", usuarioActual.uid);
      const datosUsuario = await getDoc(referenciaUsuario);

      if (datosUsuario.exists()) {
        const usuarioDatos = datosUsuario.data();
        usuario.set({ correo: usuarioActual.email, rol: usuarioDatos.rol });  // Guardamos en el store

        push("/inicio");  // Redirigir a inicio
      } else {
        console.error("Usuario no encontrado en Firestore");
        error = true;
      }
    } catch (err) {
      console.error(err);
      error = true;
    }
  }
</script>

<!-- Contenedor del formulario de inicio de sesión -->
<div class="contenedor-login">
  <div class="tarjeta-login">
    <h1>Iniciar Sesión</h1>

    <form class="formulario" on:submit|preventDefault={validarDatos}>
      <div class="grupo-formulario">
        <label for="correo">Correo electrónico</label>
        <input type="email" id="correo" bind:value={correo} placeholder="correo@ejemplo.com" required />
      </div>

      <div class="grupo-formulario">
        <label for="contrasena">Contraseña</label>
        <input type="password" id="contrasena" bind:value={contrasena} placeholder="••••••••" required />
      </div>

      {#if error}
        <div class="mensaje-error">Credenciales incorrectas</div>
      {/if}

      <button type="submit" class="boton">Iniciar Sesión</button>
    </form>

    <div class="credenciales-demo">
      <p>Credenciales de prueba:</p>
      <code>admin@example.com / admin</code>
    </div>
  </div>
</div>

<style>
  .contenedor-login {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-fondo);
  }

  .tarjeta-login {
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .boton {
    background-color: #2563eb;
    color: white;
    border: none;
    padding: 15px;
    font-weight: bold;
    cursor: pointer;
    width: 150px;
    border-radius: 0.5rem;
  }

  .boton:hover {
    background-color: #1a53ce;
  }

  h1 {
    color: var(--color-primario);
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .formulario {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .grupo-formulario {
    width: 100%;
    text-align: left;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--color-texto);
  }

  input {
    width: 100%;
    border: 1px solid #ccc;
    padding: 0.75rem;
    border-radius: 0.25rem;
  }

  input:focus {
    outline: none;
    border-color: var(--color-primario);
    box-shadow: 0 0 0 2px var(--color-primario-alpha);
  }

  .mensaje-error {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 1rem;
  }

  .credenciales-demo {
    margin-top: 2rem;
    padding: 1rem;
    font-size: 0.875rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }

  code {
    display: block;
    padding: 0.5rem;
    background-color: #eaeaea;
    border-radius: 0.25rem;
    font-family: monospace;
  }
</style>
