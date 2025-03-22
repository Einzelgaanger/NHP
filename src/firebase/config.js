// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCIw8-M_nwi77Z6X8PTOq-zyfPWGDXcKP8",
  authDomain: "membu-ca882.firebaseapp.com",
  projectId: "membu-ca882",
  storageBucket: "membu-ca882.firebasestorage.app",
  messagingSenderId: "496395825247",
  appId: "1:496395825247:web:3c78defdcb36217fbf6bea",
  measurementId: "G-PXS46DDPJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;