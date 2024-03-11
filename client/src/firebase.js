import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBk9LlL-_R4J5bnuq_YauBRabAzsljMXZE",
  authDomain: "skate-shop-adm.firebaseapp.com",
  projectId: "skate-shop-adm",
  storageBucket: "skate-shop-adm.appspot.com",
  messagingSenderId: "947599442744",
  appId: "1:947599442744:web:be453a35321683bdb937cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)
export {storage}
export {db}