import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const SubmitWrapper = styled.div`
  margin-top: 16px;
  gap: 16px;
  display: grid;
  grid-template-columns: minmax(min-content, 200px);
  place-self: center;
  justify-content: center;
  width: 100%;
`;

export const ErrorParagraph = styled.p`
  color: red;
  text-align: center;
`;

export const SignInForm = styled.form`
  display: grid;
  justify-items: center;
  gap: 32px;
`;

export const Section = styled.section`
  padding: 36px 48px;
  display: grid;
  gap: 20px;
  justify-items: center;

  ${({ theme }) => css`
    background-color: ${theme.colors.gray.gray01};
    border-radius: ${theme.borderRadius};
    color: ${theme.colors.main.main12};
  `}
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
`;

export const CustomLink = styled(Link)`
  place-self: center;
  ${({ theme }) => css`
    color: ${theme.colors.main.main11};
    width: fit-content;
    text-decoration: underline;

    &:hover {
      color: ${theme.colors.main.main12};
    }
  `}
`;
