import { useState } from "react";

import {
  Menu,
  ShoppingBag,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  function alternarMenu() {
    setMenuAberto(!menuAberto);
  }

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <header className="header">
      <div className="container header__container">

        <Link to="/" className="header__logo" onClick={fecharMenu}>
  <img
    src="/images/branding/logo-acai-bomba.png"
    alt="Açaí Bomba"
    className="header__logo-imagem"
  />
</Link>

        <nav
          className={`header__nav ${
            menuAberto ? "header__nav--aberto" : ""
          }`}
        >
          <a
            href="#inicio"
            onClick={fecharMenu}
          >
            Início
          </a>

          <a
            href="#cardapio"
            onClick={fecharMenu}
          >
            Cardápio
          </a>

          <a
            href="#como-funciona"
            onClick={fecharMenu}
          >
            Como funciona
          </a>

          <a
            href="#mais-pedidos"
            onClick={fecharMenu}
          >
            Mais pedidos
          </a>

          <a
            href="#contato"
            onClick={fecharMenu}
          >
            Contato
          </a>
        </nav>

        <Link
  to="/montar" className="header__pedido" onClick={fecharMenu}>
  <ShoppingBag size={17} />

  <span>
    Fazer pedido
  </span>
</Link>

        <button
          type="button"
          className="header__menu-mobile"
          onClick={alternarMenu}
          aria-label={
            menuAberto
              ? "Fechar menu"
              : "Abrir menu"
          }
        >
          {menuAberto ? (
            <X size={26} />
          ) : (
            <Menu size={26} />
          )}
        </button>

      </div>
    </header>
  );
}

export default Header;