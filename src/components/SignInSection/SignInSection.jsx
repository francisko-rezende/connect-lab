import { getUserDevices, getWeatherData } from "@api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth, useGlobalContext } from "@hooks";
import { axiosInstance } from "@lib/axios";
import { queryClient } from "@lib/react-query";
import { userSchema } from "@lib/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as S from "./SignInSection.styles";
import { Container, InputWrapper } from "@components";

export const SignInSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { setUserId } = useGlobalContext();

  const [error, setError] = useState("");

  const handleLogin = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);

      const { token, user } = res.data;
      const userId = user._id;
      const userCity = user.userAddress.city;

      queryClient.setQueryData("user", user);

      queryClient.prefetchQuery(["weather", userCity], () =>
        getWeatherData(userCity),
      );
      queryClient.prefetchQuery(["useDevices"], () => getUserDevices(userId));

      setUserId(userId);
      setToken(token);

      navigate("/");
    } catch (error) {
      setError("Email e/ou senha incorretos");
    }
  };

  return (
    <Container>
      <S.Wrapper>
        <S.Section>
          <h2>Acessar</h2>
          <S.SignInForm onSubmit={handleSubmit(handleLogin)}>
            <InputWrapper>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                {...register("email")}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                {...register("password")}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </InputWrapper>
            {error && <S.ErrorParagraph>{error}</S.ErrorParagraph>}
            <S.SubmitWrapper>
              <S.Button type="submit">Acessar</S.Button>
              <S.CustomLink to={"/cadastro"} variant="underlined">
                Cadastro
              </S.CustomLink>
            </S.SubmitWrapper>
          </S.SignInForm>
        </S.Section>
      </S.Wrapper>
    </Container>
  );
};
