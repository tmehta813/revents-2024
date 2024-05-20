// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import 'firebase/storage'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "revent-2024.firebaseapp.com",
  projectId: "revent-2024",
  storageBucket: "revent-2024.appspot.com",
  messagingSenderId: "330888374581",
  appId: "1:330888374581:web:193731e92cc22759e2847c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)
export const storage = getStorage(app)