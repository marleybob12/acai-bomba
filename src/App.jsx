import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />

      <main
        id="inicio"
        className="teste-tema"
      >
        <div className="container">

          <p className="texto-dourado">
            AÇAÍ BOMBA
          </p>

          <h1>
            SEU AÇAÍ,
            <br />

            <span className="texto-dourado">
              SUAS REGRAS.
            </span>
          </h1>

          <p>
            Mais que açaí, é atitude.
          </p>

          <a
            href="#cardapio"
            className="botao-dourado"
          >
            Montar meu açaí
          </a>

        </div>
      </main>
    </>
  );
}

export default App;