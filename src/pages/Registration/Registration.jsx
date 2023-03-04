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

          {/* <InputWrapper>
            <label htmlFor="fullName">Nome completo*</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              {...register("fullName")}
            />
            {errors.fullName && <p>{errors.fullName.message}</p>}
          </InputWrapper> */}
          <TextField
            errorMessage={errors.email?.message}
            name="email"
            label="E-mail*"
            {...register("email")}
          />
          {/* <InputWrapper>
            <label htmlFor="email">E-mail*</label>
            <input type="text" name="email" id="email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
          </InputWrapper> */}
          <TextField
            errorMessage={errors.photoUrl?.message}
            name="photoUrl"
            label="URL foto de perfil"
            {...register("photoUrl")}
          />
          {/* <InputWrapper>
            <label htmlFor="photoUrl">URL foto de perfil</label>
            <input
              type="text"
              name="photoUrl"
              id="photoUrl"
              {...register("photoUrl")}
            />
            {errors.photoUrl && <p>{errors.photoUrl.message}</p>}
          </InputWrapper> */}
          <TextField
            errorMessage={errors.phone?.message}
            name="phone"
            label="Telefone*"
            {...register("phone")}
          />
          {/* <InputWrapper>
            <label htmlFor="phone">Telefone*</label>
            <input
              type="phone"
              name="phone"
              id="phone"
              {...register("phone")}
            />
            {errors.phone && <p>{errors.phone.message}</p>}
          </InputWrapper> */}
          <TextField
            errorMessage={errors.password?.message}
            name="password"
            label="Senha*"
            type="password"
            {...register("password")}
          />
          {/* <InputWrapper>
            <label htmlFor="password">Senha*</label>
            <input
              type="password"
              name="password"
              id="password"
              {...register("password")}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </InputWrapper> */}
          <TextField
            errorMessage={errors.confirmPassword?.message}
            name="confirmPassword"
            label="Confirmação de senha*"
            type="password"
            {...register("confirmPassword")}
          />
          {/* <InputWrapper>
            <label htmlFor="passwordConfirmation">Confirmação de senha*</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </InputWrapper> */}
          <TextField
            errorMessage={errors.zipCode?.message}
            name="zipCode"
            label="CEP*"
            {...register("address.zipCode")}
          />
          {/* <InputWrapper>
            <label htmlFor="zipCode">CEP*</label>
            <input
              type="text"
              name="zipCode"
              id="zipCode"
              {...register("address.zipCode", {
                onBlur: (e) => getAddressInfoFromZip(e, setValue),
              })}
            />
            {errors.address?.zipCode?.message && (
              <p>{errors.address?.zipCode?.message}</p>
            )}
          </InputWrapper> */}
          <TextField
            errorMessage={errors.street?.message}
            name="street"
            label="Logradouro/Endereço*"
            {...register("address.street")}
          />
          {/* <InputWrapper>
            <label htmlFor="street">Logradouro/Endereço*</label>
            <input
              type="text"
              name="street"
              id="street"
              {...register("address.street")}
            />
            {errors.address?.street?.message && (
              <p>{errors.address?.street.message}</p>
            )}
          </InputWrapper> */}
          <TextField
            errorMessage={errors.city?.message}
            name="city"
            label="Cidade*"
            {...register("address.city")}
          />
          {/* <InputWrapper>
            <label htmlFor="city">Cidade*</label>
            <input
              type="text"
              name="city"
              id="city"
              {...register("address.city")}
            />
            {errors.address?.city?.message && (
              <p>{errors.address?.city?.message}</p>
            )}
          </InputWrapper> */}
          <TextField
            errorMessage={errors.state?.message}
            name="state"
            label="Estado*"
            {...register("address.state")}
          />
          {/* <InputWrapper>
            <label htmlFor="state">Estado*</label>
            <input
              type="text"
              name="state"
              id="state"
              {...register("address.state")}
            />
            {errors.address?.state?.message && (
              <p>{errors.address?.state?.message}</p>
            )}
          </InputWrapper> */}
          <TextField
            errorMessage={errors.complement?.message}
            name="complement"
            label="Complemento"
            {...register("address.complement")}
          />
          {/* <InputWrapper>
            <label htmlFor="complement">Complemento</label>
            <input
              type="text"
              name="complement"
              id="complement"
              {...register("address.complement")}
            />
          </InputWrapper> */}
          <TextField
            errorMessage={errors.number?.message}
            name="number"
            label="Número*"
            {...register("address.number")}
          />
          {/* <InputWrapper>
            <label htmlFor="number">Número*</label>
            <input
              type="text"
              name="number"
              id="number"
              {...register("address.number")}
            />
            {errors.address?.number?.message && (
              <p>{errors.address?.number?.message}</p>
            )}
          </InputWrapper> */}

          <TextField
            errorMessage={errors.neighborhood?.message}
            name="neighborhood"
            label="Bairro*"
            isFullWidth={true}
            {...register("address.neighborhood")}
          />
          {/* <S.CustomInputWrapper>
            <label htmlFor="neighborhood">Bairro*</label>
            <input
              type="text"
              name="neighborhood"
              id="neighborhood"
              {...register("address.neighborhood")}
            />
            {errors.address?.neighborhood?.message && (
              <p>{errors.address?.neighborhood?.message}</p>
            )}
          </S.CustomInputWrapper> */}
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
