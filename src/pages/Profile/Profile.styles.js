import { Avatar } from "@components";
import styled, { css } from "styled-components";

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
  gap: 24px;
`;
