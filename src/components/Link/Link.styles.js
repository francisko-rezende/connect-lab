import { Link as L } from "react-router-dom";
import styled, { css } from "styled-components";

export const Link = styled(L)`
  padding: 8px 16px;
  text-decoration: none;
  text-transform: uppercase;
  ${({ theme }) => css`
    color: ${theme.colors.main.main12};
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
