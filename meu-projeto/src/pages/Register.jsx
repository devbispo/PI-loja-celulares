import React, { useState } from "react";
import "../pages/Register.css";
import { Link } from "react-router-dom";
import { Create } from "../services/AuthServices";

export const Register = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  function handleSignUp(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError("Por favor, digite um e-mail válido.");
      return;
    }
    if (password.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    Create(email, password);
  }
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <div className="register">
      <h2>Register</h2>
      <form>
        <div>
          <label htmlFor="email" className="Email">
            Usuário: <br />
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error-text">{emailError}</p>}
        </div>
        <div>
          <label htmlFor="password" className="Pass">
            Senha:<br />
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="error-text">{passwordError}</p>}
          <p></p>
          <button type="button" onClick={handleSignUp}>
            Register
          </button>
          <br />
          <Link to="/">Voltar</Link>
        </div>
      </form>
    </div>
  );
};
