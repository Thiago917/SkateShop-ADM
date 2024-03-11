import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBk9LlL-_R4J5bnuq_YauBRabAzsljMXZE",
  authDomain: "skate-shop-adm.firebaseapp.com",
  projectId: "skate-shop-adm",
  storageBucket: "skate-shop-adm.appspot.com",
  messagingSenderId: "947599442744",
  appId: "1:947599442744:web:be453a35321683bdb937cd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const db = getFirestore(app)
export {storage, db}
