import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: min(100%, 500px);
  gap: 4px;
  position: relative;
  ${({ isFullWidth }) => isFullWidth && 'grid-column: 1/-1; grid-template-columns: minmax(200px, 100 %);'}

  & input {
    padding: 8px 12px;
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  & input:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.main09};
  }

  & p {
    position: absolute;
    bottom: -22px;
    font-size: 0.8rem;
    color: red;
  }
`;
