import React from "react";
import "../pages/Register.css";
import { Link } from "react-router-dom";
import { Create } from "../services/AuthServices";
import { useForm } from "react-hook-form";

export const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [success, setSuccess] = React.useState(false);

  const onSubmit = async (data) => {
    try {
      await Create(data.email, data.password);
      setSuccess(true);
      reset();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="Email">
            Usuário: <br />
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <p className="error-text">Por favor, digite um e-mail válido.</p>}
        </div>
        <div>
          <label htmlFor="password" className="Pass">
            Senha:<br />
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && <p className="error-text">A senha deve ter pelo menos 6 caracteres.</p>}
          <p></p>
          {success && <p>Cadastro realizado com sucesso!</p>}
          <button type="submit">Register</button>
          <br />
          <Link to="/">Voltar</Link>
        </div>
      </form>
      
    </div>
  );
};
