import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGjYDhMOpPxQRSNilB1k4hNjRII62IqE4",
  authDomain: "recipe-15dc9.firebaseapp.com",
  databaseURL: "https://recipe-15dc9-default-rtdb.firebaseio.com",
  projectId: "recipe-15dc9",
  storageBucket: "recipe-15dc9.appspot.com",
  messagingSenderId: "126854275903",
  appId: "1:126854275903:web:74fd05db6fe7905d94a98a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()