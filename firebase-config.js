// Importa solo lo que necesitas del SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; // opcional, solo si quieres analytics

// Configuración de tu proyecto (la tuya ya la tienes)
const firebaseConfig = {
  apiKey: "AIzaSyCnMApx3T3_u63i41idkgRpW6bqunXXMMc",
  authDomain: "institutobrutalvisual-f11e2.firebaseapp.com",
  projectId: "institutobrutalvisual-f11e2",
  storageBucket: "institutobrutalvisual-f11e2.firebasestorage.app",
  messagingSenderId: "759691988549",
  appId: "1:759691988549:web:425a1b87ad18f5099d1d2c",
  measurementId: "G-Z93V93N3E4"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Analytics (opcional)
const analytics = getAnalytics(app);

export { app, analytics };
