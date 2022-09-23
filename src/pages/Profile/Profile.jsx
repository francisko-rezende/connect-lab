import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema, validatorRegex } from "../Registration/Registration";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  useCheckToken,
  useGlobalContext,
  useUpdateProfile,
  useUser,
} from "@hooks";

// todo create schema for update form

export const Profile = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useCheckToken();

  const { userId } = useGlobalContext();

  const userQuery = useUser(userId);

  const user = userQuery.data;

  useEffect(() => {
    if (!userQuery.isLoading) {
      setValue("fullName", user.fullName);
      setValue("photoUrl", user.photoUrl);
      setValue("email", user.email);
      setValue("password", user.password);
      setValue("phone", user.phone);
      setValue("userAddress", user.userAddress);
    }
  }, [userQuery.isLoading]);

  const updateProfile = useUpdateProfile();

  const handleUpdateUserInfo = async (data) => {
    updateProfile.mutate({ userId: user._id, data });
  };
  return (
    <>
      <h1>Profile</h1>
      {userQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <img src={user.photoUrl} alt="Foto" />
            <h2>{user.fullName}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <div>Endereço</div>
            <p>
              {user.userAddress.zipCode} {user.userAddress.street} -{" "}
              {user.userAddress.complement} - {user.userAddress.neighborhood} -{" "}
              {user.userAddress.city} - {user.userAddress.state}
            </p>
          </div>

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
              <input
                type="text"
                name="email"
                id="email"
                {...register("email")}
              />
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
              <input
                type="phone"
                name="phone"
                id="phone"
                {...register("phone")}
              />
              {errors.phone && <span>{errors.phone.message}</span>}
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
            <button>Salvar</button>
            <button type="reset" onClick={() => reset()}>
              Resetar
            </button>
            <Link to={"/"}>Login</Link>
          </form>
        </>
      )}
    </>
  );
};
