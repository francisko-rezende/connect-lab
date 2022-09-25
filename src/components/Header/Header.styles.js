import styled, { css } from "styled-components";

export const Header = styled.header`
  ${({ theme }) => css`
    background: ${theme.colors.gray.gray01};
    color: ${theme.colors.main.main12};
  `}
`;

export const Wrapper = styled.header`
  height: 100px;
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
