import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Configuración de Firebase desde variables de entorno (.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// ✅ Validación simple (opcional)
for (const [key, value] of Object.entries(firebaseConfig)) {
  if (!value) {
    console.warn(`⚠️ La variable ${key} no está definida en .env`);
  }
}

// ✅ Inicialización de Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Autenticación
export const auth = getAuth(app);

// 🗃️ Base de datos Firestore
export const db = getFirestore(app);

// ☁️ Almacenamiento de archivos (PDFs, imágenes)
export const storage = getStorage(app);
