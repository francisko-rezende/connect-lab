import { Avatar, DialogContent, DialogTitle, InputWrapper } from "@components";
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

export const UserWrapper = styled.div`
  place-items: center;
  gap: 40px;
  grid-template-columns: fit-content;
  max-width: 500px;

  display: grid;
  ${({ theme }) => css`
    background: ${theme.colors.gray.gray01};
    padding: 20px 50px;
    border-radius: ${theme.borderRadius};
    margin: 0 auto;
    margin-top: 32px;
  `}
`;

export const UserInfoWrapper = styled.div`
  /* width: 100%; */
  display: grid;
  grid-template-areas:
    "avatar name name"
    "avatar email phone";
  gap: 8px;

  @media (max-width: 450px) {
    grid-template-areas:
      "avatar name"
      "avatar email"
      "avatar phone";
  }
`;

export const H2 = styled.h2`
  color: ${({ theme }) => theme.colors.main.main09};
`;

export const H3 = styled.h3`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray11};
`;

export const CustomAvatar = styled(Avatar)`
  grid-area: avatar;

  align-self: center;
`;

export const Name = styled.p`
  grid-area: name;
`;

export const Email = styled.p`
  grid-area: email;
`;

export const Phone = styled.p`
  grid-area: phone;
`;

export const ButtonsWrapper = styled.div`
  display: grid;
  place-items: center;
  gap: 4px;
`;

export const Form = styled.form`
  display: grid;
  place-items: center;
  gap: 32px;
  padding: 20px;
  overflow-x: auto;
  ${({ theme }) => css`
    background-color: ${theme.colors.gray.gray01};
    border-radius: ${theme.borderRadius};
  `}
`;

export const FieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 28px;
  column-gap: 16px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
  
`;

export const CustomInputWrapper = styled(InputWrapper)`
  grid-column: span 2;

    @media (max-width: 620px) {
    grid-column: unset;
  }
`;

export const CustomDialogContent = styled(DialogContent)`
overflow-y: auto;
  max-width: fit-content;
  max-height: 90vh;
  background-color: ${({ theme }) => theme.colors.gray07};
`;

export const CustomDialogTitle = styled(DialogTitle)`
  text-align: center;
`;
