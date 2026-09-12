import {
  useEffect,
  useState,
} from "react";

import {
  Menu,
  ShoppingBag,
  X,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import { contato } from "../../config/contato";

import "./Header.css";

function Header() {
  const [menuAberto, setMenuAberto] =
    useState(false);

  const location = useLocation();

  function alternarMenu() {
    setMenuAberto(
      (estadoAtual) => !estadoAtual
    );
  }

  function fecharMenu() {
    setMenuAberto(false);
  }

  useEffect(() => {
    if (
      location.pathname !== "/" ||
      !location.hash
    ) {
      return;
    }

    const id =
      location.hash.replace("#", "");

    const timer = setTimeout(() => {
      const elemento =
        document.getElementById(id);

      if (elemento) {
        elemento.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);

    return () =>
      clearTimeout(timer);
  }, [
    location.pathname,
    location.hash,
  ]);

  const mensagemAtendente =
    encodeURIComponent(
      "Olá! Quero falar com um atendente."
    );

  const linkWhatsapp =
    `https://wa.me/${contato.whatsapp}` +
    `?text=${mensagemAtendente}`;

  return (
    <header className="header">

      <div className="container header__container">

        <Link
          to="/#inicio"
          className="header__logo"
          onClick={fecharMenu}
          aria-label="Ir para o início"
        >
          <img
            src="/images/branding/logo-acai-bomba.png"
            alt="Açaí Bomba"
            className="header__logo-imagem"
          />
        </Link>

        <nav
          className={
            `header__nav ${
              menuAberto
                ? "header__nav--aberto"
                : ""
            }`
          }
        >

          <Link
            to="/#inicio"
            onClick={fecharMenu}
          >
            Início
          </Link>

          <Link
            to="/montar"
            onClick={fecharMenu}
          >
            Cardápio
          </Link>

          <Link
            to="/#como-funciona"
            onClick={fecharMenu}
          >
            Como funciona
          </Link>

          <Link
            to="/#mais-pedidos"
            onClick={fecharMenu}
          >
            Bombas da casa
          </Link>

          <a
            href={linkWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={fecharMenu}
          >
            Contato
          </a>

        </nav>

        <Link
          to="/montar"
          className="header__pedido"
          onClick={fecharMenu}
        >
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
          aria-expanded={menuAberto}
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