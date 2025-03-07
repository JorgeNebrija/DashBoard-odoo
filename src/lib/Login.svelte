<script>
  import { auth, db, signInWithEmailAndPassword, getDoc, doc } from "../lib/firebase";
  import { push } from "svelte-spa-router";
  import { usuario } from "../lib/store";
  
  let email = "";
  let password = "";
  let error = false;

  async function validarDatos() {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Obtener el rol del usuario desde Firestore
      const userRef = doc(db, "usuarios", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        usuario.set({ email: user.email, rol: userData.rol });  // Guardamos en el store

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
<div class="login-container">
  <div class="login-card">
    <h1>Iniciar Sesión</h1>

    <form class="formulario" on:submit|preventDefault={validarDatos}>
      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" bind:value={email} placeholder="correo@ejemplo.com" required />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" bind:value={password} placeholder="••••••••" required />
      </div>

      {#if error}
        <div class="error">Credenciales Incorrectas</div>
      {/if}

      <button type="submit" class="boton"> Iniciar Sesión </button>
    </form>

    <div class="demo-credentials">
      <p>Credenciales de prueba:</p>
      <code>admin@example.com / admin</code>
    </div>
  </div>
</div>

<style>
  .login-container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-background);
  }

  .login-card {
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
    color: var(--color-primary);
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .formulario {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .form-group {
    width: 100%;
    text-align: left;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--color-text);
  }

  input {
    width: 100%;
    border: 1px solid #ccc;
    padding: 0.75rem;
    border-radius: 0.25rem;
  }

  input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary-alpha);
  }

  .error {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 1rem;
  }

  .demo-credentials {
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
