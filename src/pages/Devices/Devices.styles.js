import styled, { css } from "styled-components";

export const H2 = styled.h2`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray12};
  margin-top: 40px;
`;

export const Li = styled.li`
  display: grid;
  place-items: center;
  padding: 20px;
  gap: 20px;
  ${({ theme }) => css`
    background-color: ${theme.colors.gray.gray01};
    border-radius: ${theme.borderRadius};
  `}
`;

export const ImgWrapper = styled.div`
  width: 80px;
  height: 80px;
`;

export const Search = styled.input`
  width: 100%;
  padding: 0 1rem;
  line-height: 2;
  border-radius: ${({ theme }) => theme.borderRadius};
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.main09};
  }
`;

export const SearchBarWrapper = styled.div`
  padding-top: 40px;
`;

export const Label = styled.label``;

export const ContentWrapper = styled.div`
  display: grid;
  place-content: center;
`;

export const ButtonsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const Form = styled.form`
  display: grid;
  gap: 1rem;
`;
