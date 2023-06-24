import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut }
  from 'firebase/auth'
import { auth } from "../services/FireBaseConfig";


export function SignIn (email, password) {
    
        signInWithEmailAndPassword(auth,email, password);

}

export function Logout (){
    signOut(auth)
}   

export function Create (email, password){
    createUserWithEmailAndPassword(auth, email, password)

}