// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDndd4iV8BoT2JwY1uV7vYsLR69qGGa_lE",
  authDomain: "fischlol.firebaseapp.com",
  projectId: "fischlol",
  storageBucket: "fischlol.firebasestorage.app",
  messagingSenderId: "113718786708",
  appId: "1:113718786708:web:2d123dca17f6f3d1d25281",
  measurementId: "G-71T588Q3BT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);