import { useState } from "react";

import {
  Crown,
  Menu,
  ShoppingBag,
  X,
} from "lucide-react";

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

        <a
          href="/"
          className="header__logo"
          onClick={fecharMenu}
        >
          <Crown
            className="header__crown"
            size={26}
            strokeWidth={2}
          />

          <div className="header__logo-texto">
            <span>AÇAÍ</span>
            <strong>BOMBA</strong>
          </div>
        </a>

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

        <a
          href="#cardapio"
          className="header__pedido"
        >
          <ShoppingBag size={17} />

          <span>
            Fazer pedido
          </span>
        </a>

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