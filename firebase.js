// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ0WecNA9py5z_J28rRis-fXl22pO597Q",
  authDomain: "crab-city.firebaseapp.com",
  projectId: "crab-city",
  storageBucket: "crab-city.appspot.com",
  messagingSenderId: "544648301969",
  appId: "1:544648301969:web:f44becfae4452351f2de30",
  measurementId: "G-9CE2J5DDJX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);