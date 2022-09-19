import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "@lib/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { errorMessages } from "../../pages/Registration/Registration";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "@hooks";

const userSchema = yup.object({
  email: yup.string().email("E-mail inválido").required(errorMessages.required),
  password: yup
    .string()
    .min(8, errorMessages.getMinCharNumMessage('"senha"', 8)),
});

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleLogin = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      const token = res.data.token;
      setToken(token);
      navigate("/");
    } catch (error) {
      setError("Email e/ou senha incorretos");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button>Teste</button>
      </form>
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
      <Link to={"/cadastro"}>Cadastro</Link>
    </>
  );
};

Login.propTypes = {};
