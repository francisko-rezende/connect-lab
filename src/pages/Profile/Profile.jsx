import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema, validatorRegex } from "../Registration/Registration";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { axiosInstance } from "@lib/axios";

export const Profile = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm(/* { resolver: yupResolver(formSchema) } */);

  const getUser = async (id) => {
    const res = await axiosInstance.get(`/users/${id}`);
    return res;
  };

  useEffect(() => {
    getUser("632729c69bc4141442d087fa").then(({ data }) => {
      setValue("fullName", data.fullName);
      setValue("photoUrl", data.photoUrl);
      setValue("email", data.email);
      setValue("password", data.password);
      setValue("phone", data.phone);
      setValue("userAddress", data.userAddress);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateUserInfo = async (data) => {
    const res = await axiosInstance.put(
      `/users/${"632729c69bc4141442d087fa"}`,
      data,
    );
    console.log(res);
    reset();
  };

  return (
    <>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit(handleUpdateUserInfo)}>
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

        {/* <div>
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
        </div> */}

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
      </form>
    </>
  );
};
