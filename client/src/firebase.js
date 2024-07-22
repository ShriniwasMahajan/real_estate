// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-3052c.firebaseapp.com",
  projectId: "real-estate-3052c",
  storageBucket: "real-estate-3052c.appspot.com",
  messagingSenderId: "228190849486",
  appId: "1:228190849486:web:c654003c4c88a07b65c39f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
