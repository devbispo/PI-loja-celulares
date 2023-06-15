import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import '../pages/Register.css'
import { auth } from "../services/FireBaseConfig";


export const Register = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  function handleSignOut(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(email, password);
  }

  if (loading) {
    return <p><h1>Carregando...</h1></p>;
  }
    return (
      <div className="register">
        <h2>Register</h2>
        <form>
          <div>
            <label htmlFor="email" className="Email"> Email <br></br></label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            </div>
          <div>
            <label htmlFor="password" className="Pass">Password :<br></br></label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword (e.target.value)}
            />
           
            <p></p>
          <button type="button" onClick={handleSignOut}>Register</button>
          
          </div>
        </form>
      </div>
    );
}