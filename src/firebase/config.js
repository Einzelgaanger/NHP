import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCIw8-M_nwi77Z6X8PTOq-zyfPWGDXcKP8",
  authDomain: "membu-ca882.firebaseapp.com",
  projectId: "membu-ca882",
  storageBucket: "membu-ca882.firebasestorage.app",
  messagingSenderId: "496395825247",
  appId: "1:496395825247:web:3c78defdcb36217fbf6bea",
  measurementId: "G-PXS46DDPJS",
  databaseURL: "https://membu-ca882-default-rtdb.firebaseio.com" // Add this line
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore
export const db = getFirestore(app);

// Realtime Database
export const realtimeDb = getDatabase(app);

// Storage
export const storage = getStorage(app);

export default app;