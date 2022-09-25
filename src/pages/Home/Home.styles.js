import styled, { css } from "styled-components";

export const Temperature = styled.p`
  font-size: 3rem;
  ${({ theme }) => css`
    color: ${theme.colors.main.main10};
    font-weight: ${theme.font.weight.bold};
  `}
`;

export const WeatherWrapper = styled.div`
  display: grid;
  place-items: center;
  padding: 20px;
  ${({ theme }) => css`
    background: ${theme.colors.gray.gray01};
    border-radius: ${theme.borderRadius};
  `}
`;

export const DeviceInfoWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const DeviceInfoParagraph = styled.p`
  align-self: center;
`;

export const DeviceName = styled.h3`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

export const Grid = styled.ul`
  margin-top: 40px;
  list-style: none;
  padding-left: 0;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(340px, auto));

  @media (max-width: 1083) {
  }
`;

export const DeviceCard = styled.div`
  padding: 20px;
  display: grid;
  gap: 8px;
  grid-template-columns: 80px 1fr 40px;
  ${({ theme }) => css`
    background: ${theme.colors.gray.gray01};
    border-radius: ${theme.borderRadius};
  `}
`;

export const ImgWrapper = styled.div`
  height: 80px;
  width: 80px;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
`;
