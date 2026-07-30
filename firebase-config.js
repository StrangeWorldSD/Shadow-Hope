// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase/app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.17.0/firebase/analytics.js";
// Importa aquí también Firestore y Auth cuando los necesites:
// import { getAuth } from "https://www.gstatic.com/firebasejs/12.17.0/firebase/auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/12.17.0/firebase/firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH1zFMTERRa-UfjhtBvpIvTb3r3GNhTfY",
  authDomain: "strangeworld-84ea7.firebaseapp.com",
  projectId: "strangeworld-84ea7",
  storageBucket: "strangeworld-84ea7.firebasestorage.app",
  messagingSenderId: "85741297859",
  appId: "1:85741297859:web:e7dbee985bc6adacfcc276",
  measurementId: "G-NSEVDMRW3S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Si quieres usar estos servicios en tus otros scripts, puedes exportarlos:
// export { app, analytics };
