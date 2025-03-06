
<script>
  import { navigate } from "svelte-routing";

  import usuariosJSON from "../data/usuarios.json";

  let email = "";
  let password = "";
  let error = "";

  function validarDatos() {
    if (
      email === usuariosJSON.usuarios[0].correo &&
      password === usuariosJSON.usuarios[0].contrasena
    ) {
      navigate("/inicio");
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
        <input
          type="email"
          id="email"
          bind:value={email}
          placeholder="correo@ejemplo.com"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          id="password"
          bind:value={password}
          placeholder="••••••••"
          required
        />
      </div>

      <!-- Muestra un mensaje de error si la autenticación falla -->
      {#if error}
        <div class="error">{error}</div>
      {/if}

      <button type="submit" class="boton"> Iniciar Sesión </button>
    </form>

    <!-- Información sobre credenciales de prueba -->
    <div class="demo-credentials">
      <p>Credenciales de prueba:</p>
      <code>admin@example.com / admin</code>
      <code>user@example.com / user</code>
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

  .formulario {
    padding: 30px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0.5rem;
    width: 300px;
  }

  .boton:hover {
    background-color: #1a53ce;
  }

  h1 {
    color: var(--color-primary);
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--color-text);
  }

  input {
    width: 250px;
    border: 1px #ccc solid;
    padding: 0.5rem;
    border-radius: 0.25rem;
  }

  input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary-alpha);
  }

  .error {
    color: #ef4444;
    margin-bottom: 1rem;
    font-size: 0.875rem;
  }

  button {
    width: 100%;
  }

  .demo-credentials {
    margin-top: 2rem;
    padding-top: 1rem;
    font-size: 0.875rem;
    background-color: white;
    padding: 30px;
    border-radius: 0.25rem;
  }

  .demo-credentials p {
    margin-bottom: 0.5rem;
  }

  code {
    display: block;
    padding: 0.5rem;
    background-color: #eaeaea;
    border-radius: 0.25rem;
    margin-bottom: 0.5rem;
    font-family: monospace;
  }
</style>
