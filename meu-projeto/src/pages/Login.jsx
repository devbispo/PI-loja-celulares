import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SignIn } from "../services/AuthServices";
import "../pages/Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  async function handleSignIn(e) {
    e.preventDefault();
    try {
      await SignIn(email, password);
      history.push("/store");
    } catch (error) {
      setError("Ocorreu um erro ao fazer login. Por favor, tente novamente.");
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-text">{error}</p>}
        </div>
        <button type="button" onClick={handleSignIn}>
          Login
        </button>
        <br />
        <Link to="/">Esqueceu a Senha?</Link>
        <br />
        <Link to="/register">Cadastre-se</Link>
      </form>
    </div>
  );
};
