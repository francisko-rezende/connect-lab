import styled, { css } from "styled-components";

export const Button = styled.button`
  padding: 8px 16px;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  ${({ theme }) => css`
    color: ${theme.colors.main.main12};
    border: unset;
    background: ${theme.colors.main.main09};
    border-radius: ${theme.borderRadius};
    font-weight: ${theme.font.weight.bold};
  `}

  &:hover {
    ${({ theme }) => css`
      background: ${theme.colors.main.main10};
      border-radius: ${theme.borderRadius};
    `}
  }

  &:visited {
    color: unset;
  }

  &:active {
    color: unset;
  }
`;
