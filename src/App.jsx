import { useNavigate } from "react-router-dom";
import { Router } from "@router";
import { useAuth, useGlobalContext } from "@hooks";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "@styles";
import { Button, Header, Link, Logo, MoonIcon, SunIcon } from "@components";
import { useState } from "react";

function App() {
  const navigate = useNavigate();
  const { token, signOut } = useAuth();
  const { theme, toggleTheme } = useGlobalContext();
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;
  const [icon, setIcon] = useState("fa-solid fa-moon");
  const themeToggler = () => {
    icon === "fa-solid fa-sun"
      ? setIcon("fa-solid fa-moon")
      : setIcon("fa-solid fa-sun");
  };
  return (
    <ThemeProvider theme={currentTheme}>
      <div
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Header>
          {/* todo add hidden text component with title */}
          <h1 aria-label="Connect Lab" style={{ height: "100%" }}>
            <Logo />
          </h1>
          <button
          className="changeTheme"
          onClick={function (event) {
            toggleTheme();
            themeToggler();
          }}
        >
          <i className={icon}></i>
        </button>
          <nav>
            {token ? (
              <>
                <Button variant="underlined" onClick={signOut}>
                  Deslogar
                </Button>
                <Link variant="underlined" to="/">
                  Início
                </Link>
                <Link variant="underlined" to="devices">
                  Devices
                </Link>
                <Link variant="underlined" to="perfil">
                  Perfil
                </Link>
              </>
            ) : (
              <Link to="/login" variant="button">
                Login
              </Link>
            )}
          </nav>
        </Header>

        <main>
          <Router />
        </main>

        <footer>
          <p style={{ textAlign: "center" }}>Feito por Francisko</p>
        </footer>
        <GlobalStyles />
      </div>
    </ThemeProvider>
  );
}

export default App;
