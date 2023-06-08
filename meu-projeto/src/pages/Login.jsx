import React, { useState } from "react";
import '../pages/Login.css'

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleLogin = () => {
      // Verifica se os campos estão preenchidos
      if (!username || !password) {
        setError ("Por favor, preencha todos os campos.");
        
        return;
      }
  
      // Aqui você pode adicionar a lógica para autenticar o usuário
      // por exemplo, enviar os dados para um servidor ou verificar em algum lugar localmente.
      console.log("Username:", username);
      console.log("Password:", password);
  
      // Limpa os campos e a mensagem de erro após o login
      setUsername("");
      setPassword("");
      setError("");
    };
  
    return (
      <div className="login">
        <h2>Login</h2>
        <form>
          <div>
            <label htmlFor="username" className="User">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="Pass">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error-text">{error}</p>}
          <button type="button" onClick={handleLogin}>Login</button>
          
          </div>
        </form>
      </div>
    );
}