<script>
  import { autenticacion, baseDeDatos, signInWithEmailAndPassword, getDoc, doc } from "../lib/firebase";
  import { push } from "svelte-spa-router";
  import { usuario } from "../lib/store";

  let correo = "";
  let contrasena = "";
  let error = false;

  async function validarDatos() {
    error = false; // Reiniciar estado de error antes de validar

    try {
      const credencialesUsuario = await signInWithEmailAndPassword(autenticacion, correo, contrasena);
      const usuarioActual = credencialesUsuario.user;
      console.log("UID del usuario:", usuarioActual.uid);

      // Obtener el rol del usuario desde Firestore
      const referenciaUsuario = doc(baseDeDatos, "usuarios", usuarioActual.uid);
      const datosUsuario = await getDoc(referenciaUsuario);

      if (datosUsuario.exists()) {
        const usuarioDatos = datosUsuario.data();
        console.log("Datos en Firestore:", usuarioDatos);

        usuario.set({ correo: usuarioActual.email, rol: usuarioDatos.rol });
        push("/inicio");
      } else {
        console.error("Usuario no encontrado en Firestore");
        error = true;
      }
    } catch (err) {
      console.error("Error en inicio de sesión:", err);
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
      <p>¿No tiene cuenta? <a href="/registro" on:click|preventDefault={() => push("/registro")}>Regístrese aquí</a></p>
    </div>
    
  </div>
</div>

<style>
.contenedor-login {
  min-height: 100vh; /* Usar min-height en lugar de height */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-fondo);
  padding: 2rem 1rem; /* Aumentar padding en móviles */
}

.tarjeta-login {
  background-color: var(--color-elementos);
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  width: 90%; /* Evitar que se expanda demasiado en móviles */
}

.boton {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 12px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease;
}

.boton:hover {
  background-color: #1a53ce;
  transform: scale(1.05);
}

@media (max-width: 480px) {
  .boton {
      font-size: 0.9rem; /* Reducir tamaño en pantallas pequeñas */
      padding: 10px;
  }
}

h1 {
  color: var(--color-texto);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
}

.formulario {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

@media (max-width: 480px) {
  .formulario {
      gap: 0.75rem; /* Reducimos espacio entre elementos en móviles */
  }
}

.grupo-formulario {
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center; /* Mejor alineación del texto */

}

label {
  display: block;
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-texto);
  margin-bottom: 0.5rem;
  text-align: left;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
}

input:focus {
  outline: none;
  border-color: var(--color-primario);
  box-shadow: 0 0 5px var(--color-primario-alpha);
}

@media (max-width: 480px) {
  input {
      padding: 10px; /* Reducir padding en móviles */
  }
}

.mensaje-error {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 1rem;
  font-weight: 500;
  text-align: center; /* Mejor visibilidad en móviles */
}

.credenciales-demo {
  padding: 20px;
  text-align: center; /* Centrar contenido */
}
</style>