import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__conteudo">

        <p>
          © 2026 Açaí Bomba.
          Todos os direitos reservados.
        </p>

        <p>
          Desenvolvido por{" "}
          <a
            href="https://portifolio1-pi-three.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
           Desenvolvido por Marley Tech
          </a>
        </p>

      </div>
    </footer>
  );
}

export default Footer;