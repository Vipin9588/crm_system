// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCAPENEVbG-vcfj_t0_bGa6aZ5Cg3aknr4",
    authDomain: "crmv-69ebc.firebaseapp.com",
    projectId: "crmv-69ebc",
    storageBucket: "crmv-69ebc.firebasestorage.app",
    messagingSenderId: "686351438761",
    appId: "1:686351438761:web:e97b52980eef8cfdc1eab8",
    measurementId: "G-3TH06TJ5HB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);