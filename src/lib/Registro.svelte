<script>
  import { push } from "svelte-spa-router";
    import { registrarUsuario } from "../lib/firebase";
  
    let correo = "";
    let contrasena = "";
    let rol = "empleado"; // Por defecto, el usuario se registra como empleado
    let error = "";
    let exito = false;
  
    async function manejarRegistro() {
      error = "";
      exito = false;
  
      try {
        await registrarUsuario(correo, contrasena, rol);
        exito = true;
        correo = "";
        contrasena = "";
        rol = "empleado";
        console.log("Registro exitoso");
      } catch (err) {
        error = err.message;
      }
    }
  </script>
  
  <div class="contenedor-registro">
    <div class="tarjeta-registro">
      <h1>Crear Cuenta</h1>
  
      <form class="formulario" on:submit|preventDefault={manejarRegistro}>
        <div class="grupo-formulario">
          <label for="correo">Correo electrónico</label>
          <input type="email" id="correo" bind:value={correo} placeholder="correo@ejemplo.com" required />
        </div>
  
        <div class="grupo-formulario">
          <label for="contrasena">Contraseña</label>
          <input type="password" id="contrasena" bind:value={contrasena} placeholder="••••••••" required />
        </div>
  
        <div class="grupo-formulario">
          <label for="rol">Rol</label>
          <select id="rol" bind:value={rol}>
            <option value="admin">Administrador</option>
            <option value="empleado">Empleado</option>
          </select>
        </div>
        <div class="credenciales-demo">
            <p>¿Ya tiene una cuenta? <a href="/login" on:click|preventDefault={() => push("/")}>Inicie sesión aquí</a></p>
        </div>
          
  
        {#if error}
          <div class="mensaje-error">{error}</div>
        {/if}
  
        {#if exito}
          <div class="mensaje-exito">¡Registro exitoso! Ahora puedes iniciar sesión.</div>
        {/if}
  
        <button type="submit" class="boton">Registrarse</button>
      </form>
    </div>
  </div>
  
  <style>
    .contenedor-registro {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-fondo);
    }
  
    .tarjeta-registro {
    background-color: var(--color-elementos);
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    flex-direction: column;
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
      font-weight: bold;
    }
  
    input, select {
      width: 100%;
      border: 1px solid #ccc;
      padding: 0.75rem;
      border-radius: 0.25rem;
      background-color: var(--color-elementos);
    }
  
    input:focus, select:focus {
      outline: none;
      border-color: var(--color-elementos);
      box-shadow: 0 0 0 2px var(--color-primario-alpha);
    }
  
    .boton {
      background-color: #2563eb;
      color: white;
      border: none;
      padding: 15px;
      font-weight: bold;
      cursor: pointer;
      width: 100%;
      border-radius: 0.5rem;
    }
  
    .boton:hover {
      background-color: #1a53ce;
    }
  
    .mensaje-error {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 1rem;
    }
  
    .mensaje-exito {
      color: #10b981;
      font-size: 0.875rem;
      margin-top: 1rem;
    }
  </style>
  