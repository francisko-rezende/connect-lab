import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { InputWrapper } from "@components";

export const SendWrapper = styled.div`
  margin-top: 16px;
  gap: 16px;
  display: grid;
  grid-template-columns: minmax(min-content, 200px);
  place-self: center;
  justify-content: center;
  width: 100%;
  grid-column: 1/-1;
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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px 0;
  padding: 40px;
  gap: 16px;

  ${({ theme }) => css`
    background-color: ${theme.colors.gray.gray01};
    border-radius: ${theme.borderRadius};
  `}

  @media (max-width: 516px) {
    padding: 20px 8px;
  }
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 28px;
  column-gap: 16px;

  @media (max-width: 516px) {
    grid-template-columns: 1fr;
  }
`;

export const CustomInputWrapper = styled(InputWrapper)`
  grid-column: 1/-1;
  grid-template-columns: minmax(200px, 100%);
`;
