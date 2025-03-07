import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAlBDZFaMii1RU0ZUHNTVtXUZE1bW9BG0",
  authDomain: "odoo-erp-62455.firebaseapp.com",
  projectId: "odoo-erp-62455",
  storageBucket: "odoo-erp-62455.firebasestorage.app",
  messagingSenderId: "502782799967",
  appId: "1:502782799967:web:9eb63ddcae563356f7ebea"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword, signOut, getDoc, doc };
