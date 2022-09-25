import styled, { css } from "styled-components";

const buttonVariants = {
  regular: (theme) => css`
    text-transform: uppercase;

    color: ${theme.colors.main.main12};
    border: unset;
    background: ${theme.colors.main.main09};
    border-radius: ${theme.borderRadius};
    font-weight: ${theme.font.weight.bold};

    &:hover {
      background: ${theme.colors.main.main10};
      border-radius: ${theme.borderRadius};
    }
  `,
  underlined: (theme) => css`
    color: ${theme.colors.main.main11};
    width: fit-content;
    text-decoration: underline;
    background: unset;
    border: unset;
    text-transform: capitalize;

    &:hover {
      color: ${theme.colors.main.main12};
    }
  `,
};

export const Button = styled.button`
  padding: 8px 16px;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;

  ${({ variant, theme }) => css`
    ${!!variant && buttonVariants[variant](theme)}
  `}
`;
