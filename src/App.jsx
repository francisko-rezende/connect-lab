import { useNavigate } from "react-router-dom";
import { Router } from "@router";
import { useAuth } from "@hooks";
function App() {
  const { hasSignedIn, toggleSignedIn } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <header>
        {hasSignedIn ? "Tá logado" : "Não tá ligado"}
        <button onClick={toggleSignedIn}>
          {hasSignedIn ? "Deslogar" : "Logar"}
        </button>
        <button onClick={() => navigate("/")}>ir pra home</button>
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
    </>
  );
}

export default App;
