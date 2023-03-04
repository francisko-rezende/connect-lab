import { useState } from "react";
import { useForm } from "react-hook-form";
import * as S from "./Registration.styles.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance } from "@lib/axios";
import { formSchema, validatorRegex } from "@lib/yup";
import { Button, Container, InputWrapper } from "@components";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const {
    register,
    handleSubmit,
    setValue,
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
      console.log(data);
      await axiosInstance.post("/auth/register", data);
      toast.success("Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/login"), 3 * 1000);
    } catch (error) {
      const errorMessage = error.response.data.error;
      setRegistrationResult(`Houve um erro: ${errorMessage}`);
    }
  };

  return (
    <Container>
      <div>
        <Toaster />
      </div>
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
              {...register("address.zipCode", {
                onBlur: (e) => {
                  const zipCode = e.target.value;
                  const isValidZip = validatorRegex.zipCode.test(zipCode);
                  if (isValidZip) {
                    const numbersOnlyZip = zipCode.replace(/\D/g, "");
                    fetch(`https://viacep.com.br/ws/${numbersOnlyZip}/json/`)
                      .then((response) => response.json())
                      .then(({ bairro, localidade, logradouro, uf }) => {
                        setValue("address.neighborhood", bairro);
                        setValue("address.city", localidade);
                        setValue("address.street", logradouro);
                        setValue("address.state", uf);
                      });
                  }
                },
              })}
            />
            {errors.address?.zipCode?.message && (
              <p>{errors.address?.zipCode?.message}</p>
            )}
          </InputWrapper>
          <InputWrapper>
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
          </InputWrapper>
          <InputWrapper>
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
          </InputWrapper>
          <InputWrapper>
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
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="complement">Complemento</label>
            <input
              type="text"
              name="complement"
              id="complement"
              {...register("address.complement")}
            />
          </InputWrapper>
          <InputWrapper>
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
          </InputWrapper>
          <S.CustomInputWrapper>
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
