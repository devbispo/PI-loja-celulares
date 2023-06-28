import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from "../services/FireBaseConfig";

export async function SignIn(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    // Trate o erro aqui
    if (error.code === "auth/invalid-email" || error.code === "auth/wrong-password") {
      throw new Error("Email ou senha inválidos. Por favor, tente novamente.");
    } else {
      throw error;
    }
  }
}

export function Logout() {
  signOut(auth);
}

export function Create(email, password) {
  createUserWithEmailAndPassword(auth, email, password);
}
