import styled, { css } from 'styled-components'

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