import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔥 Tu nueva configuración generada por Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA4A_-bevl7hrx2U23nxV1E0XDYgGnVP4k",
  authDomain: "biblioteca-virtual-57473.firebaseapp.com",
  projectId: "biblioteca-virtual-57473",
  storageBucket: "biblioteca-virtual-57473.firebasestorage.app", // ⚠️ este dominio está MAL escrito
  messagingSenderId: "457696878584",
  appId: "1:457696878584:web:a17502e82b151ccc55800d",
  measurementId: "G-HNYF314XW1",
};

// ✅ Corregí el dominio de storage:
firebaseConfig.storageBucket = "biblioteca-virtual-57473.appspot.com";

const app = initializeApp(firebaseConfig);

// Exportá auth y firestore para usar en tu app
export const auth = getAuth(app);
export const db = getFirestore(app);
