import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
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

// Detectar cambios en la sesión del usuario y mantener la persistencia
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

export { autenticacion, baseDeDatos, signInWithEmailAndPassword, cerrarSesion, getDoc, doc };
