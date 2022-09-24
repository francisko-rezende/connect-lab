import { Link as RouterLink } from "react-router-dom";
import styled, { css } from "styled-components";

const linkVariants = {
  button: (theme) => css`
    color: ${theme.colors.main.main12};
    background: ${theme.colors.main.main09};
    border-radius: ${theme.borderRadius};
    font-weight: ${theme.font.weight.bold};
    text-transform: uppercase;

    &:hover {
      background: ${theme.colors.main.main10};
      border-radius: ${theme.borderRadius};
    }
  `,
  underlined: (theme) => css`
    color: ${theme.colors.main.main11};
    width: fit-content;
    text-decoration: underline;

    &:hover {
      color: ${theme.colors.main.main12};
    }
  `,
};

export const Link = styled(RouterLink)`
  padding: 8px 16px;
  text-decoration: none;

  ${({ theme, variant }) => css`
    ${!!variant && linkVariants[variant](theme)}
  `}

  &:active {
    color: unset;
  }
`;
