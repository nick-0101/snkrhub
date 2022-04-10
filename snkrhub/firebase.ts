// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC640ZTG024zos6mgwOX1WEmzxFC4RJJwU",
  authDomain: "snkrhub-7249e.firebaseapp.com",
  projectId: "snkrhub-7249e",
  storageBucket: "snkrhub-7249e.appspot.com",
  messagingSenderId: "14660481479",
  appId: "1:14660481479:web:e747566bc0271ce09c69e2",
  measurementId: "G-749J6X8LK1"
};

// Initialize Firebase
export const firebaseApp = 
!getApps().length ? initializeApp(firebaseConfig) : getApp()