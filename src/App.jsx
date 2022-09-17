import { Registration } from "@pages";
import { Link, RouterProvider } from "react-router-dom";
import { Router } from "@router";
function App() {
  return (
    <>
      <header>
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
