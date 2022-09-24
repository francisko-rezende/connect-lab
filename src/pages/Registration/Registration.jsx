import { useState } from "react";
import { useForm } from "react-hook-form";
import * as S from "./Registration.styles.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { axiosInstance } from "@lib/axios";
import { formSchema, validatorRegex } from "@lib/yup";

export const Registration = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const [registrationResult, setRegistrationResult] = useState("");

  const handleRegisterUser = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);
      console.log(res);
      setRegistrationResult("Usuário cadastrado com sucesso");
    } catch (error) {
      const errorMessage = error.response.data.error;
      setRegistrationResult(`Houve um erro: ${errorMessage}`);
    }
  };

  return (
    <>
      <h2>Cadastrar</h2>
      <S.Form onSubmit={handleSubmit(handleRegisterUser)}>
        <div>
          <label htmlFor="fullName">Nome completo*</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            {...register("fullName")}
          />
          {errors.fullName && <span>{errors.fullName.message}</span>}
        </div>

        <div>
          <label htmlFor="email">E-mail*</label>
          <input type="text" name="email" id="email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label htmlFor="photoUrl">URL foto de perfil</label>
          <input
            type="text"
            name="photoUrl"
            id="photoUrl"
            {...register("photoUrl")}
          />
          {errors.photoUrl && <span>{errors.photoUrl.message}</span>}
        </div>

        <div>
          <label htmlFor="phone">Telefone*</label>
          <input type="phone" name="phone" id="phone" {...register("phone")} />
          {errors.phone && <span>{errors.phone.message}</span>}
        </div>

        <div>
          <label htmlFor="password">Senha*</label>
          <input
            type="password"
            name="password"
            id="password"
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div>
          <label htmlFor="passwordConfirmation">Confirmação de senha*</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>

        <div>
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
            <span>{errors.userAddress?.zipCode?.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="street">Logradouro/Endereço*</label>
          <input
            type="text"
            name="street"
            id="street"
            {...register("userAddress.street")}
          />
          {errors.userAddress?.street?.message && (
            <span>{errors.userAddress?.street.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="city">Cidade*</label>
          <input
            type="text"
            name="city"
            id="city"
            {...register("userAddress.city")}
          />
          {errors.userAddress?.city?.message && (
            <span>{errors.userAddress?.city?.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="state">Estado*</label>
          <input
            type="text"
            name="state"
            id="state"
            {...register("userAddress.state")}
          />
          {errors.userAddress?.state?.message && (
            <span>{errors.userAddress?.state?.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="complement">Complemento</label>
          <input
            type="text"
            name="complement"
            id="complement"
            {...register("userAddress.complement")}
          />
        </div>

        <div>
          <label htmlFor="number">Número*</label>
          <input
            type="text"
            name="number"
            id="number"
            {...register("userAddress.number")}
          />
          {errors.userAddress?.number?.message && (
            <span>{errors.userAddress?.number?.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="neighborhood">Bairro*</label>
          <input
            type="text"
            name="neighborhood"
            id="neighborhood"
            {...register("userAddress.neighborhood")}
          />
          {errors.userAddress?.neighborhood?.message && (
            <span>{errors.userAddress?.neighborhood?.message}</span>
          )}
        </div>

        <button>Enviar</button>
        <button type="reset" onClick={() => reset()}>
          Resetar
        </button>
        <Link to={"/"}>Login</Link>
        {registrationResult && <p>{registrationResult}</p>}
      </S.Form>
    </>
  );
};
