import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema, profileUpdateSchema, validatorRegex } from "@lib/yup";
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

// todo create schema for update form
// todo replace paragraphs with semantic html for address info

export const Profile = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(profileUpdateSchema) });

  useCheckToken();

  const { userId } = useGlobalContext();
  const { signOut } = useAuth();

  const userQuery = useUser(userId);

  const user = userQuery.data;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!userQuery.isLoading) {
      setValue("fullName", user.fullName);
      setValue("photoUrl", user.photoUrl);
      setValue("email", user.email);
      setValue("password", user.password);
      setValue("phone", user.phone);
      setValue("userAddress", user.userAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userQuery.isLoading]);

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
                {user.userAddress.zipCode} - {user.userAddress.street}{" "}
                {user.userAddress.complement} - {user.userAddress.neighborhood}{" "}
                - {user.userAddress.city} - {user.userAddress.state}
              </p>
            </div>
            <S.ButtonsWrapper>
              <Button variant="regular" onClick={() => setIsDialogOpen(true)}>
                Editar
              </Button>
              <Button variant="underlined" onClick={() => signOut()}>
                Sair
              </Button>
            </S.ButtonsWrapper>
          </S.UserWrapper>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <S.CustomDialogContent>
              <S.CustomDialogTitle>Meu Perfil</S.CustomDialogTitle>
              <S.Form onSubmit={handleSubmit(handleUpdateUserInfo)}>
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
                      {...register("userAddress.zipCode", {
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
                                  setValue("userAddress.neighborhood", bairro);
                                  setValue("userAddress.city", localidade);
                                  setValue("userAddress.street", logradouro);
                                  setValue("userAddress.state", uf);
                                },
                              );
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
              </S.Form>
            </S.CustomDialogContent>
          </Dialog>
        </Container>
      )}
    </>
  );
};
