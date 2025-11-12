// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT_ID.appspot.com",
//   messagingSenderId: "SENDER_ID",
//   appId: "APP_ID",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDiwuvHvKeyOMCVGCeOHbHT8mA0P8y_ZHM",
  authDomain: "tour-and-travel-agency-b8383.firebaseapp.com",
  projectId: "tour-and-travel-agency-b8383",
  storageBucket: "tour-and-travel-agency-b8383.firebasestorage.app",
  messagingSenderId: "279610026024",
  appId: "1:279610026024:web:d1bfeebb50a548207a6d1d",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
