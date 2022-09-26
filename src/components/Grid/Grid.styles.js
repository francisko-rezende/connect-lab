import styled from "styled-components";

export const Ul = styled.ul`
  margin-top: 40px;
  list-style: none;
  padding-left: 0;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(340px, auto));

  @media (max-width: 1083) {
  }
`;
