import * as AvatarPrimitive from "@radix-ui/react-avatar";
import styled, { css } from "styled-components";

export const Avatar = styled(AvatarPrimitive.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.gray.gray3};
`;

export const AvatarImage = styled(AvatarPrimitive.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;
export const AvatarFallback = styled(AvatarPrimitive.Fallback)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  line-height: 1;
  ${({ theme }) => css`
    background-color: ${theme.colors.gray.gray07};
    color: ${theme.colors.main.main10};
    font-weight: ${theme.font.bold};
  `}
`;
