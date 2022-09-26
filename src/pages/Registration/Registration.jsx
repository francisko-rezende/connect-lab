import { useState } from "react";
import { useForm } from "react-hook-form";
import * as S from "./Registration.styles.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance } from "@lib/axios";
import { formSchema, validatorRegex } from "@lib/yup";
import { Button, Container, InputWrapper } from "@components";

export const Registration = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const [registrationResult, setRegistrationResult] = useState("");

  const handleRegisterUser = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);
      setRegistrationResult("Usuário cadastrado com sucesso");
    } catch (error) {
      const errorMessage = error.response.data.error;
      setRegistrationResult(`Houve um erro: ${errorMessage}`);
    }
  };

  return (
    <Container>
      <S.Wrapper>
        <h2>Cadastrar</h2>
        <S.Form onSubmit={handleSubmit(handleRegisterUser)}>
          <InputWrapper>
            <label htmlFor="fullName">Nome completo*</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              {...register("fullName")}
            />
            {errors.fullName && <p>{errors.fullName.message}</p>}
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="email">E-mail*</label>
            <input type="text" name="email" id="email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="photoUrl">URL foto de perfil</label>
            <input
              type="text"
              name="photoUrl"
              id="photoUrl"
              {...register("photoUrl")}
            />
            {errors.photoUrl && <p>{errors.photoUrl.message}</p>}
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="phone">Telefone*</label>
            <input
              type="phone"
              name="phone"
              id="phone"
              {...register("phone")}
            />
            {errors.phone && <p>{errors.phone.message}</p>}
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="password">Senha*</label>
            <input
              type="password"
              name="password"
              id="password"
              {...register("password")}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="passwordConfirmation">Confirmação de senha*</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="zipCode">CEP*</label>
            <input
              type="text"
              name="zipCode"
              id="zipCode"
              {...register("userAddress.zipCode", {
                onBlur: (e) => {
                  const zipCode = e.target.value;
                  const isValidZip = validatorRegex.zipCode.test(zipCode);
                  if (isValidZip) {
                    const numbersOnlyZip = zipCode.replace(/\D/g, "");
                    fetch(`https://viacep.com.br/ws/${numbersOnlyZip}/json/`)
                      .then((response) => response.json())
                      .then(({ bairro, localidade, logradouro, uf }) => {
                        setValue("userAddress.neighborhood", bairro);
                        setValue("userAddress.city", localidade);
                        setValue("userAddress.street", logradouro);
                        setValue("userAddress.state", uf);
                      });
                  }
                },
              })}
            />
            {errors.userAddress?.zipCode?.message && (
              <p>{errors.userAddress?.zipCode?.message}</p>
            )}
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="street">Logradouro/Endereço*</label>
            <input
              type="text"
              name="street"
              id="street"
              {...register("userAddress.street")}
            />
            {errors.userAddress?.street?.message && (
              <p>{errors.userAddress?.street.message}</p>
            )}
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="city">Cidade*</label>
            <input
              type="text"
              name="city"
              id="city"
              {...register("userAddress.city")}
            />
            {errors.userAddress?.city?.message && (
              <p>{errors.userAddress?.city?.message}</p>
            )}
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="state">Estado*</label>
            <input
              type="text"
              name="state"
              id="state"
              {...register("userAddress.state")}
            />
            {errors.userAddress?.state?.message && (
              <p>{errors.userAddress?.state?.message}</p>
            )}
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="complement">Complemento</label>
            <input
              type="text"
              name="complement"
              id="complement"
              {...register("userAddress.complement")}
            />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="number">Número*</label>
            <input
              type="text"
              name="number"
              id="number"
              {...register("userAddress.number")}
            />
            {errors.userAddress?.number?.message && (
              <p>{errors.userAddress?.number?.message}</p>
            )}
          </InputWrapper>
          <S.CustomInputWrapper>
            <label htmlFor="neighborhood">Bairro*</label>
            <input
              type="text"
              name="neighborhood"
              id="neighborhood"
              {...register("userAddress.neighborhood")}
            />
            {errors.userAddress?.neighborhood?.message && (
              <p>{errors.userAddress?.neighborhood?.message}</p>
            )}
          </S.CustomInputWrapper>
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
