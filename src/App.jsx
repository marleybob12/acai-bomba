import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import ComoFunciona from "./components/ComoFunciona/ComoFunciona";
import { Route,Routes,} from "react-router-dom";
import MontarAcai from "./pages/MontarAcai/MontarAcai";
import Carrinho from "./pages/Carrinho/Carrinho";

  
function App() {
  return (
    <>
      <Header />

<main>
  <Routes>

    <Route
      path="/"
      element={
        <>
          <Hero />

          <ComoFunciona />
        </>
      }
    />

    <Route
      path="/carrinho"
      element={<Carrinho />}
/>
    <Route
      path="/montar"
      element={<MontarAcai />}
    />

  </Routes>
</main>
    </>
  );
}

export default App;