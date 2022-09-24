import { useNavigate } from "react-router-dom";
import { Router } from "@router";
import { useAuth, useGlobalContext } from "@hooks";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "@styles";
import { Header, Link, Logo } from "@components";

function App() {
  const navigate = useNavigate();
  const { token, signOut } = useAuth();
  const { theme, toggleTheme } = useGlobalContext();
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <Header>
          <Logo as="h1" />
          {token && <button onClick={signOut}>Deslogar</button>}
          <button onClick={toggleTheme}>Mudar tema</button>
          <nav>
            <Link to="/login">Login</Link>
          </nav>
        </Header>
        <main>
          <Router />
        </main>
        <footer>
          <p>Feito com 😠 por Francisko</p>
        </footer>
        <GlobalStyles />
      </ThemeProvider>
    </>
  );
}

export default App;
