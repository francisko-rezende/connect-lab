import styled from 'styled-components'

export const SearchBarWrapper = styled.div`
  padding-top: 40px;
`;

export const Search = styled.input`
  width: 100%;
  padding: 0 1rem;
  line-height: 2;
  border-radius: ${({ theme }) => theme.borderRadius};
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.main09};
  }
`;