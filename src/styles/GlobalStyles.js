import { createGlobalStyle, css } from "styled-components";

export const GlobalStyles = createGlobalStyle`
 
*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  font-family: 'IBM Plex Sans', sans-serif;
}

html, body {
  height: 100%;
  ${({ theme }) => css`
    background: ${theme.colors.gray.gray01};
    color: ${theme.colors.gray.gray12};
  `}
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
  height: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

#root, #__next {
  isolation: isolate;
}
`;
