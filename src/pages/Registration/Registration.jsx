import { useState } from "react";
import { useForm } from "react-hook-form";
import * as S from "./Registration.styles.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance } from "@lib/axios";
import { formSchema } from "@lib/yup";
import { Button, Container, TextField } from "@components";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: {
        state: "RJ",
        city: "Rio de Janeiro",
        neighborhood: "Vale dos Puxadores de Ferro",
        number: 17,
        street: "Rua Felipe Franco",
        zipCode: "28495-000",
        complement: "",
      },
      phone: "(35) 9 9828-0000",
      photoUrl: "https://duck.com",
      fullName: "Léo Stronda",
      confirmPassword: "VemMonstro",
      password: "VemMonstro",
      email: "leo@stronda.com",
    },
    resolver: yupResolver(formSchema),
  });

  const navigate = useNavigate();
  const [registrationResult, setRegistrationResult] = useState("");

  const handleRegisterUser = async (data) => {
    try {
      await axiosInstance.post("/auth/register", data);
      toast.success("Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/login"), 3 * 1000);
    } catch (error) {
      if (error.response.status === 409) {
        setRegistrationResult("Usuário já registrado.");
        return;
      }

      setRegistrationResult("Houve um erro, tente novamente mais tarde");
    }
  };

  return (
    <Container>
      <Toaster />
      <S.Wrapper>
        <h2>Cadastrar</h2>
        <S.Form onSubmit={handleSubmit(handleRegisterUser)}>
          <TextField
            errorMessage={errors.fullName?.message}
            name="fullName"
            label="Nome completo*"
            {...register("fullName")}
          />
          <TextField
            errorMessage={errors.email?.message}
            name="email"
            label="E-mail*"
            {...register("email")}
          />
          <TextField
            errorMessage={errors.photoUrl?.message}
            name="photoUrl"
            label="URL foto de perfil"
            {...register("photoUrl")}
          />
          <TextField
            errorMessage={errors.phone?.message}
            name="phone"
            label="Telefone*"
            {...register("phone")}
          />
          <TextField
            errorMessage={errors.password?.message}
            name="password"
            label="Senha*"
            type="password"
            {...register("password")}
          />
          <TextField
            errorMessage={errors.confirmPassword?.message}
            name="confirmPassword"
            label="Confirmação de senha*"
            type="password"
            {...register("confirmPassword")}
          />
          <TextField
            errorMessage={errors.zipCode?.message}
            name="zipCode"
            label="CEP*"
            {...register("address.zipCode")}
          />
          <TextField
            errorMessage={errors.street?.message}
            name="street"
            label="Logradouro/Endereço*"
            {...register("address.street")}
          />
          <TextField
            errorMessage={errors.city?.message}
            name="city"
            label="Cidade*"
            {...register("address.city")}
          />
          <TextField
            errorMessage={errors.state?.message}
            name="state"
            label="Estado*"
            {...register("address.state")}
          />
          <TextField
            errorMessage={errors.complement?.message}
            name="complement"
            label="Complemento"
            {...register("address.complement")}
          />
          <TextField
            errorMessage={errors.number?.message}
            name="number"
            label="Número*"
            {...register("address.number")}
          />
          <TextField
            errorMessage={errors.neighborhood?.message}
            name="neighborhood"
            label="Bairro*"
            isFullWidth={true}
            {...register("address.neighborhood")}
          />
          {registrationResult && <p>{registrationResult}</p>}
          <S.SendWrapper>
            <Button type="submit" variant="regular">
              Enviar
            </Button>
            <S.CustomLink to={"/login"}>Login</S.CustomLink>
          </S.SendWrapper>
        </S.Form>
      </S.Wrapper>
    </Container>
  );
};
