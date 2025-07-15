// firebase-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAcNV_dCwZF-rgzqhFIyy4qiyBxmK3HjrY",
  authDomain: "adhaya-trust.firebaseapp.com",
  projectId: "adhaya-trust",
  storageBucket: "adhaya-trust.firebasestorage.app",
  messagingSenderId: "215585085681",
  appId: "1:215585085681:web:3ed90eb6ed0b6abd52f150",
  measurementId: "G-G6DP93LZVR"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { signInWithEmailAndPassword };
