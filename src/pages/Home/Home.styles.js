import { DialogTitle } from "@components";
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
  margin-top: 60px;
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

export const CustomDialogTitle = styled(DialogTitle)`
  font-size: 1.25rem;
  text-align: center;
`;

export const ContentWrapper = styled.div`
  display: grid;
  place-items: center;
  gap: 35px;
`;

export const H3 = styled.h3`
  font-size: 1rem;
  ${({ theme }) => css`
    color: ${theme.colors.gray.gray11};
  `}
`;

export const Status = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.gray.gray11};
  `}
`;

export const StatusButtonWrapper = styled.div`
  cursor: pointer;
  width: 35px;
  height: 35px;
`;

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const H4 = styled.h4`
  font-size: 1rem;
  line-height: 2.5;
  ${({ theme }) => css`
    color: ${theme.colors.gray.gray12};
    border-bottom: 1px solid ${theme.colors.gray.gray12};
  `}
`;

export const DetailsWrapper = styled.div``;

export const FilterButton = styled.button`
  ${({ theme, isSelected }) => css``}
`;

export const FilterButtonsWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 8px;
`;
