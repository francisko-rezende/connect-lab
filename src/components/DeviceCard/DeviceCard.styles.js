import styled, { css } from 'styled-components'

export const DeviceCard = styled.div`
  cursor: pointer;
  padding: 20px;
  display: grid;
  gap: 8px;
  grid-template-columns: 80px 1fr 40px;
  align-items: center;
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

export const DeviceInfoWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const DeviceName = styled.h3`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

export const DeviceInfoParagraph = styled.p`
  align-self: center;
`;

export const StatusButtonWrapper = styled.div`
  cursor: pointer;
  width: 35px;
  height: 35px;
`;