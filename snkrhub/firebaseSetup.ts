// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


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
const firebaseApp: FirebaseApp = 
!getApps().length ? initializeApp(firebaseConfig) : getApp();


export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);