import React, { useState, } from "react";
import '../pages/Register.css'
import {Link} from 'react-router-dom';
import { Create } from "../services/AuthServices";


export const Register = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

  function handleSignOut(e) {
    e.preventDefault();
    Create(email, password);
  
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  }
    return (
      <div className="register">
        <h2>Register</h2>
        <form>
          <div>
            <label htmlFor="email" className="Email"> Usuário: <br></br></label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            </div>
          <div>
            <label htmlFor="password" className="Pass">Senha:<br></br></label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword (e.target.value)}
            />
           
            <p></p>
          <button type="button" onClick={handleSignOut}>Register</button>
          <br></br>
          <Link to="/">Voltar</Link>
          
          </div>
        </form>
      </div>
    );
}