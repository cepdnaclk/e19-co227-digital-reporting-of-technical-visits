// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXd4IZm5-vfEgwxjJka1N8RRech-1oylU",
  authDomain: "visitlog00.firebaseapp.com",
  projectId: "visitlog00",
  storageBucket: "visitlog00.appspot.com",
  messagingSenderId: "296031466051",
  appId: "1:296031466051:web:e0806d383fbe105c76daf6",
  measurementId: "G-1B1E1HE63W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider(app);
export const db = getFirestore(app);