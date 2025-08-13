// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//djfdf
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh2v0if3uvc8dAIl_KDtL_ZNUkRVpzM94",
  authDomain: "basic-crud-41dc6.firebaseapp.com",
  projectId: "basic-crud-41dc6",
  storageBucket: "basic-crud-41dc6.firebasestorage.app",
  messagingSenderId: "481926747747",
  appId: "1:481926747747:web:de3fe8a833ef7a0f47ca56",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
