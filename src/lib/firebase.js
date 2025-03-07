import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { usuario } from "./store";

const configuracionFirebase = {
  apiKey: "AIzaSyCAlBDZFaMii1RU0ZUHNTVtXUZE1bW9BG0",
  authDomain: "odoo-erp-62455.firebaseapp.com",
  projectId: "odoo-erp-62455",
  storageBucket: "odoo-erp-62455.firebasestorage.app",
  messagingSenderId: "502782799967",
  appId: "1:502782799967:web:9eb63ddcae563356f7ebea"
};

// Inicializar Firebase
const aplicacion = initializeApp(configuracionFirebase);
const autenticacion = getAuth(aplicacion);
const baseDeDatos = getFirestore(aplicacion);

// Función para registrar usuarios
async function registrarUsuario(correo, contrasena, rol = "empleado") {
  try {
    // Crear usuario en Firebase Authentication
    const credencialesUsuario = await createUserWithEmailAndPassword(autenticacion, correo, contrasena);
    const usuarioNuevo = credencialesUsuario.user;

    // Guardar usuario en Firestore con el UID correcto
    await setDoc(doc(baseDeDatos, "usuarios", usuarioNuevo.uid), {
      correo: usuarioNuevo.email,
      rol: rol
    });

    console.log("Usuario registrado y guardado en Firestore:", usuarioNuevo.email);
    return usuarioNuevo;
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    throw error;
  }
}

// Detectar cambios en la sesión del usuario
onAuthStateChanged(autenticacion, async (usuarioActual) => {
  if (usuarioActual) {
    const referenciaUsuario = doc(baseDeDatos, "usuarios", usuarioActual.uid);
    const datosUsuario = await getDoc(referenciaUsuario);

    if (datosUsuario.exists()) {
      usuario.set({ correo: usuarioActual.email, rol: datosUsuario.data().rol });
    } else {
      usuario.set(null);
    }
  } else {
    usuario.set(null);
  }
});

// Función para cerrar sesión
async function cerrarSesion() {
  await signOut(autenticacion);
  usuario.set(null);
}

export { autenticacion, baseDeDatos, signInWithEmailAndPassword, createUserWithEmailAndPassword, registrarUsuario, cerrarSesion, onAuthStateChanged , getDoc, doc };
