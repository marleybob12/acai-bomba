import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import ComoFunciona from "./components/ComoFunciona/ComoFunciona";
import BombasDaCasa from "./components/BombasDaCasa/BombasDaCasa";

import { Route, Routes } from "react-router-dom";

import MontarAcai from "./pages/MontarAcai/MontarAcai";
import Carrinho from "./pages/Carrinho/Carrinho";
import Checkout from "./pages/Checkout/Checkout";

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

                <BombasDaCasa />
              </>
            }
          />

          <Route
            path="/montar"
            element={<MontarAcai />}
          />

          <Route
            path="/carrinho"
            element={<Carrinho />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;