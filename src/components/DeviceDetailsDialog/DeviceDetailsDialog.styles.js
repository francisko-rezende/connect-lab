import styled, { css } from 'styled-components'
import * as DialogPrimitive from "@radix-ui/react-dialog";


export const ContentWrapper = styled.div`
  display: grid;
  place-items: center;
  gap: 35px;
`;

export const CustomDialogTitle = styled(DialogPrimitive.Title)`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray.gray12};
  font-size: 2rem;
  font-size: 1.25rem;
  text-align: center;
`;

export const H3 = styled.h3`
  font-size: 1rem;
  ${({ theme }) => css`
    color: ${theme.colors.gray.gray11};
  `}
`;

export const ImgWrapper = styled.div`
  height: 80px;
  width: 80px;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
`;

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const Status = styled.p`
  color: ${({ theme }) => theme.colors.gray.gray11};
`;

export const StatusButtonWrapper = styled.div`
  cursor: pointer;
  width: 35px;
  height: 35px;
`;

export const H4 = styled.h4`
  font-size: 1rem;
  line-height: 2.5;
  ${({ theme }) => css`
    color: ${theme.colors.gray.gray12};
    border-bottom: 1px solid ${theme.colors.gray.gray12};
  `}
`;