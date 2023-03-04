import styled, { css } from 'styled-components'

export const WeatherWrapper = styled.div`
  display: grid;
  place-items: center;
  padding: 20px;
  margin-top: 60px;
  ${({ theme }) => css`
    background: ${theme.colors.gray.gray01};
    border-radius: ${theme.borderRadius};
  `}
`;

export const Temperature = styled.p`
  font-size: 3rem;
  ${({ theme }) => css`
    color: ${theme.colors.main.main10};
    font-weight: ${theme.font.weight.bold};
  `}
`;