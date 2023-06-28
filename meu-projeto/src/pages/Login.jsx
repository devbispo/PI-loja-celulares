import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserContext from '../contexts/UserContext'
import "../pages/Login.css";

export const Login = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [error, setError] = React.useState("");
  const history = useHistory();
  const { handleLogin } = useContext(UserContext)

  const onSubmit = async (data) => {
    try {
      await handleLogin(data.email, data.password);
      history.push("/store");
    } catch (error) {
      setError("Ocorreu um erro ao fazer login. Por favor, tente novamente");
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Username:</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Digite seu Email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="error-text">Campo obrigatório.</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua senha"
            {...register("password", { required: true })}
          />
          {errors.password && <p className="error-text">Campo obrigatório.</p>}
          {error && <p className="error-text">{error}</p>}
        </div>
        <button type="submit">
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
