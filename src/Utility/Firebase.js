import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app"
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiwuvHvKeyOMCVGCeOHbHT8mA0P8y_ZHM",
  authDomain: "tour-and-travel-agency-b8383.firebaseapp.com",
  projectId: "tour-and-travel-agency-b8383",
  storageBucket: "tour-and-travel-agency-b8383.firebasestorage.app",
  messagingSenderId: "279610026024",
  appId: "1:279610026024:web:d1bfeebb50a548207a6d1d",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore()
