// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHOcAdjFuguFZC28X37oLRZ5bcd20ToZA",
  authDomain: "kin0searchbot.firebaseapp.com",
  databaseURL: "https://kin0searchbot-default-rtdb.firebaseio.com",
  projectId: "kin0searchbot",
  storageBucket: "kin0searchbot.appspot.com",
  messagingSenderId: "471259576157",
  appId: "1:471259576157:web:4fb68ab69979ccddef9ab4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;