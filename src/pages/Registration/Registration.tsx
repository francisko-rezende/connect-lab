import { FormField } from "@components";
import React from "react";
import { useForm } from "react-hook-form";
import * as S from "./Registration.styles.js";

const onSubmit = (data) => console.log(data);

export const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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
          {errors.fullName && <span>Esse campo é obrigatório</span>}
        </div>

        <div>
          <label htmlFor="email">E-mail*</label>
          <input type="text" name="email" id="email" {...register("email")} />
          {errors.email && <span>Esse campo é obrigatório</span>}
        </div>

        <div>
          <label htmlFor="photoUrl">URL foto de perfil</label>
          <input
            type="text"
            name="photoUrl"
            id="photoUrl"
            {...register("photoUrl")}
          />
        </div>

        <div>
          <label htmlFor="phone">E-mail*</label>
          <input type="phone" name="phone" id="phone" {...register("phone")} />
        </div>

        <div>
          <label htmlFor="password">Senha*</label>
          <input
            type="password"
            name="password"
            id="password"
            {...register("password")}
          />
        </div>

        <div>
          <label htmlFor="passwordConfirmation">Confirmação de senha*</label>
          <input
            type="text"
            name="passwordConfirmation"
            id="passwordConfirmation"
            {...register("passwordConfirmation")}
          />
        </div>

        <div>
          <label htmlFor="zipCode">CEP*</label>
          <input
            type="text"
            name="zipCode"
            id="zipCode"
            {...register("userAddress.zipCode")}
          />
        </div>

        <div>
          <label htmlFor="street">Logradouro/Endereço*</label>
          <input
            type="text"
            name="street"
            id="street"
            {...register("userAddress.street")}
          />
        </div>

        <div>
          <label htmlFor="city">Cidade*</label>
          <input
            type="text"
            name="city"
            id="city"
            {...register("userAddress.city")}
          />
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
        </div>

        <div>
          <label htmlFor="neighborhood">Bairro*</label>
          <input
            type="text"
            name="neighborhood"
            id="neighborhood"
            {...register("userAddress.neighborhood")}
          />
        </div>

        <button>Enviar</button>
        <a href="#">Login</a>
      </S.Form>
    </>
  );
};

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
