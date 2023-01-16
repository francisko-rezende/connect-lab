import { yupResolver } from "@hookform/resolvers/yup";
import {
  changePasswordSchema,
  formSchema,
  profileUpdateSchema,
  validatorRegex,
} from "@lib/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatToPhone } from "brazilian-values";
import {
  useAuth,
  useCheckToken,
  useGlobalContext,
  useUpdateProfile,
  useUser,
} from "@hooks";
import {
  Button,
  Container,
  Dialog,
  InputWrapper,
  Link as CustomLink,
} from "@components";
import * as S from "./Profile.styles";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance } from "@lib/axios";

// todo create schema for update form
// todo replace paragraphs with semantic html for address info

export const Profile = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(changePasswordSchema) });

  useCheckToken();

  const { userId } = useGlobalContext();
  const { signOut } = useAuth();

  const userQuery = useUser(userId);

  const user = userQuery.data;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // useEffect(() => {
  //   if (!userQuery.isLoading) {
  //     setValue("fullName", user.fullName);
  //     setValue("photoUrl", user.photoUrl);
  //     setValue("email", user.email);
  //     setValue("password", user.password);
  //     setValue("phone", user.phone);
  //     setValue("address", user.address);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userQuery.isLoading]);

  const updateProfile = useUpdateProfile();

  const handleUpdateUserInfo = (data) => {
    toast.promise(
      updateProfile.mutateAsync({ userId: user._id, data, setIsDialogOpen }),
      {
        loading: "Salvando alterações...",
        success: <b>Alterações salvas!</b>,
        error: <b>Não foi possível salvar as alterações.</b>,
      },
    );
  };

  const handleChangePassword = async (data) => {
    try {
      toast.loading("Carregando");
      await axiosInstance.patch("change-password", data);
      toast.success("Senha alterada com sucesso");
    } catch (error) {
      toast.error("Ocorreu um erro, tente novamente depois");
      console.log(error);
    }
    toast.dismiss();
  };

  return (
    <>
      {userQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <Container>
          <div>
            <Toaster />
          </div>
          <S.UserWrapper>
            <S.H2>Meu Perfil</S.H2>
            <S.UserInfoWrapper>
              <S.CustomAvatar name={user.fullName} src={user.photoUrl} />
              <S.Name>{user.fullName}</S.Name>
              <S.Email>{user.email}</S.Email>
              <S.Phone>{formatToPhone(user.phone)}</S.Phone>
            </S.UserInfoWrapper>
            <div>
              <S.H3>Endereço</S.H3>
              <p>
                {user.address.zipCode} - {user.address.street}{" "}
                {user.address.complement} - {user.address.neighborhood} -{" "}
                {user.address.city} - {user.address.state}
              </p>
            </div>
            <S.ButtonsWrapper>
              <Button variant="regular" onClick={() => setIsDialogOpen(true)}>
                Mudar senha
              </Button>
              <Button variant="underlined" onClick={() => signOut()}>
                Sair
              </Button>
            </S.ButtonsWrapper>
          </S.UserWrapper>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <S.CustomDialogContent>
              <S.CustomDialogTitle>Meu Perfil</S.CustomDialogTitle>

              <S.Form onSubmit={handleSubmit(handleChangePassword)}>
                <InputWrapper>
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    {...register("email")}
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </InputWrapper>
                <InputWrapper>
                  <label htmlFor="oldPassword">Senha antiga</label>
                  <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    {...register("oldPassword")}
                  />
                  {errors.oldPassword && <p>{errors.oldPassword.message}</p>}
                </InputWrapper>
                <InputWrapper>
                  <label htmlFor="newPassword">Senha nova</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    {...register("newPassword")}
                  />
                  {errors.newPassword && <p>{errors.newPassword.message}</p>}
                </InputWrapper>

                <InputWrapper>
                  <label htmlFor="confirmNewPassword">
                    Confirmar senha nova
                  </label>
                  <input
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    {...register("confirmNewPassword")}
                  />
                  {errors.confirmNewPassword && (
                    <p>{errors.confirmNewPassword.message}</p>
                  )}
                </InputWrapper>

                <S.SubmitWrapper>
                  <Button type="submit" variant="regular">
                    Submeter
                  </Button>
                </S.SubmitWrapper>
              </S.Form>
              {/* <S.Form onSubmit={handleSubmit(handleUpdateUserInfo)}>
                <S.FieldsWrapper>
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
                    <input
                      type="text"
                      name="email"
                      id="email"
                      {...register("email")}
                    />
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
                    <label htmlFor="zipCode">CEP*</label>
                    <input
                      type="text"
                      name="zipCode"
                      id="zipCode"
                      {...register("address.zipCode", {
                        onBlur: (e) => {
                          const zipCode = e.target.value;
                          const isValidZip =
                            validatorRegex.zipCode.test(zipCode);
                          if (isValidZip) {
                            const numbersOnlyZip = zipCode.replace(/\D/g, "");
                            fetch(
                              `https://viacep.com.br/ws/${numbersOnlyZip}/json/`,
                            )
                              .then((response) => response.json())
                              .then(
                                ({ bairro, localidade, logradouro, uf }) => {
                                  setValue("address.neighborhood", bairro);
                                  setValue("address.city", localidade);
                                  setValue("address.street", logradouro);
                                  setValue("address.state", uf);
                                },
                              );
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
                </S.FieldsWrapper>
                <S.ButtonsWrapper>
                  <Button variant="regular">Salvar</Button>
                  <Button
                    variant="underlined"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                </S.ButtonsWrapper>
              </S.Form> */}
            </S.CustomDialogContent>
          </Dialog>
        </Container>
      )}
    </>
  );
};
