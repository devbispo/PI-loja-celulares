import React, { useState } from "react";
import '../pages/Login.css'
import {Link, useHistory} from 'react-router-dom';
import { SignIn } from "../services/AuthServices";



export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history  = useHistory();

 async function handleSignIn(e) {
    e.preventDefault();
    try {
      await SignIn(email, password)
      history.push("/store")
    } catch (error) {
      console.log("erro")
    }
  }
  return (
      <div className="login">
        <h2>Login</h2>
        <form>
          <div>
            <label htmlFor="email">Username:</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Digite seu Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password :</label>
            <input
             type="password"
             name="password"
             id="password"
             placeholder="Digite sua senha"
             onChange={(e) => setPassword(e.target.value)}
            />
            {/*error && <p className="error-text">{error}</p>*/}
            <p></p>
          <button type="button" onClick={handleSignIn}>Login</button>
          <br></br>
            <Link>Esqueceu a Senha?</Link>
            <br></br>
            <Link to ='/register'>Cadastre-se</Link>
          
          </div>
        </form>
      </div>
    );
}