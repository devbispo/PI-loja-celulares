import React, { useState, } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import '../pages/Register.css'
import { auth } from "../services/FireBaseConfig";
import {Link} from 'react-router-dom';


export const Register = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
    const [registrationCompleted, setRegistrationCompleted] = useState(false);


  function handleSignOut(e) {
    e.preventDefault();
  
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    
    createUserWithEmailAndPassword(email, password)
      .then(() => {
        setRegistrationCompleted(true);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        // Lidar com erros de registro, se necessário
        console.log(error);
      });
  }

  if (loading) {
    return <p><h1>Carregando...</h1></p>;
  }
    return (
      <div className="register">
        <h2>Register</h2>
      {registrationCompleted && (
        <p>Cadastro realizado com sucesso!</p>
      )}
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