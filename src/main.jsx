import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { PedidoProvider } from "./context/PedidoContext";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <PedidoProvider>
      <App />
    </PedidoProvider>
  </BrowserRouter>
</StrictMode>
);
