import * as S from "./SignInSection.styles";
import { Container, Button, TextField } from "@components";
import { useSignIn } from "@hooks";

export const SignInSection = () => {
  const { error, errors, handleLogin, handleSubmit, register } = useSignIn();

  return (
    <Container>
      <S.Wrapper>
        <S.Section>
          <h2>Acessar</h2>
          <S.SignInForm onSubmit={handleSubmit(handleLogin)}>
            <TextField
              errorMessage={errors.email?.message}
              name="email"
              label="E-mail"
              {...register("email")}
            />
            <TextField
              errorMessage={errors.password?.message}
              name="password"
              type="password"
              label="Senha"
              {...register("password")}
            />
            {error && <S.ErrorParagraph>{error}</S.ErrorParagraph>}
            <S.SubmitWrapper>
              <Button type="submit" variant="regular">
                Acessar
              </Button>
              <S.CustomLink to={"/cadastro"} variant="underlined">
                Cadastro
              </S.CustomLink>
            </S.SubmitWrapper>
          </S.SignInForm>
        </S.Section>
      </S.Wrapper>
    </Container>
  );
};
