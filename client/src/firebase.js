import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBm3YGK-c7fGy8DQ5FyWmciUyeMoOcgP9M",
  authDomain: "skateshop-3cb76.firebaseapp.com",
  projectId: "skateshop-3cb76",
  storageBucket: "skateshop-3cb76.appspot.com",
  messagingSenderId: "64157374763",
  appId: "1:64157374763:web:c057f8d67b77d5aada4d6e",
  measurementId: "G-WTNJG48MN0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)