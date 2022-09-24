import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray.gray12};
  height: 100%;
  padding: 10px 0;
`;
