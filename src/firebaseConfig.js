// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhbbqddMJW-S1RPRYrIlLO6y2y3X5ySog",
  authDomain: "gestion-tache-reactjs.firebaseapp.com",
  projectId: "gestion-tache-reactjs",
  storageBucket: "gestion-tache-reactjs.firebasestorage.app",
  messagingSenderId: "988746760684",
  appId: "1:988746760684:web:a15cf6cb3a8697aa3d40c9",
//   measurementId: "G-NXJS2V4DC4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
