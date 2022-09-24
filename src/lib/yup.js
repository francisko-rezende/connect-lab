import * as yup from "yup";
import "yup-phone";

export const errorMessages = {
  required: "Campo obrigatório",
  zipCode: "Formato de CEP inválido",
  url: "Url inválida",
  getMinCharNumMessage: (field, min) =>
    `O campo ${field} precisa ter pelo menos ${min} caracteres`,
};

export const validatorRegex = {
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

export const formSchema = yup.object({
  email: yup.string().email("Email inválido").required(errorMessages.required),
  password: yup
    .string()
    .min(8, errorMessages.getMinCharNumMessage('"senha"', 8)),
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

export const userSchema = yup.object({
  email: yup.string().email("E-mail inválido").required(errorMessages.required),
  password: yup
    .string()
    .min(8, errorMessages.getMinCharNumMessage('"senha"', 8)),
});
