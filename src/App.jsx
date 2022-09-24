import { useNavigate } from "react-router-dom";
import { Router } from "@router";
import { useAuth, useGlobalContext } from "@hooks";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "@styles";

function App() {
  const navigate = useNavigate();
  const { token, signOut } = useAuth();
  const { theme } = useGlobalContext();
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <header>
          <button onClick={() => navigate("/")}>ir pra home</button>
          {token && <button onClick={signOut}>Deslogar</button>}
          <p>Tema atual: {theme}</p>
          <nav>
            <h1>Título</h1>
          </nav>
        </header>
        <main>
          <Router />
        </main>
        <footer>
          <p>Feito com 😠 por Francisko</p>
        </footer>
      </ThemeProvider>
    </>
  );
}

export default App;
