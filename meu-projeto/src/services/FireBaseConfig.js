import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJtKIlV8zGv8X5Ur99yF-go-qsjpux_OU",
  authDomain: "autentic-c0b34.firebaseapp.com",
  projectId: "autentic-c0b34",
  storageBucket: "autentic-c0b34.appspot.com",
  messagingSenderId: "533986492214",
  appId: "1:533986492214:web:f7f33edc8dfea58d4f3d97"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
export const auth = getAuth(app);