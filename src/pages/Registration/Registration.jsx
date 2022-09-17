import { FormField } from "@components";
import React from "react";
import { useForm } from "react-hook-form";
import * as S from "./Registration.styles.js";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone";

const onSubmit = (data) => console.log(data);

// {
//   "email": "usuario@teste.com.br",
//   "password": "12345678",
//   "fullName": "Usuaário",
//   "photoUrl": "",
//   "phone": "(47) 99999-9999",
//   "userAddress": {
//       "zipCode": "85500-000",
//       "street": "Rua teste",
//       "number": "4",
//       "neighborhood": "Bairro XYZ",
//       "city": "Joinville",
//       "state": "Santa Catarina",
//       "complement": "Ap 204"
//   }
// }

const errorMessages = {
  required: "Campo obrigatório",
  zipCode: "Formato de CEP inválido",
  url: "Url inválida",
  minCharNum: (field, min) =>
    `O campo ${field} precisa ter pelo menos ${min} caracteres`,
};
const validatorRegex = {
  zipCode: /[0-9]{5}-[0-9]{3}/,
};

const addressSchema = yup.object({
  zipCode: yup
    .string()
    .matches(validatorRegex.zipCode, { message: errorMessages.zipCode })
    .required(errorMessages.required),
  street: yup.string().required(errorMessages.required),
  number: yup.number().typeError().required(errorMessages.required),
  neighborhood: yup.string().required(errorMessages.required),
  city: yup.string().required(errorMessages.required),
  state: yup.string().required(errorMessages.required),
  // complement: yup.string(),
});

const formSchema = yup.object({
  email: yup.string().email("Email inválido").required(errorMessages.required),
  password: yup.string().min(8, errorMessages.minCharNum('"senha"', 8)),
  confirmPassword: yup
    .string()
    .required(errorMessages.required)
    .oneOf([yup.ref("password"), null], "As senhas devem ser iguais"),
  fullName: yup.string().required(errorMessages.required),
  photoUrl: yup.string().url(errorMessages.url),
  phone: yup
    .string()
    .phone("BR", true, "Telefone inválido")
    .required(errorMessages.required),
  userAddress: addressSchema,
});

export const Registration = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  console.log(errors);

  return (
    <>
      <h2>Cadastrar</h2>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
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
            type="text"
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
        <a href="#">Login</a>
      </S.Form>
    </>
  );
};
