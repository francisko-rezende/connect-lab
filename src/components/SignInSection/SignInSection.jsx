import * as S from "./SignInSection.styles";
import { Container, InputWrapper, Button } from "@components";
import { useSignIn } from "hooks/useSignIn";

export const SignInSection = () => {
  const { error, errors, handleLogin, handleSubmit, register } = useSignIn();

  return (
    <Container>
      <S.Wrapper>
        <S.Section>
          <h2>Acessar</h2>
          <S.SignInForm onSubmit={handleSubmit(handleLogin)}>
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
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                {...register("password")}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </InputWrapper>
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
