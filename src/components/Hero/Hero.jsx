import {
  ArrowRight,
  Gem,
  Leaf,
  MapPin,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section
      className="hero"
      id="inicio"
    >
      <div className="hero__efeito hero__efeito--roxo" />
      <div className="hero__efeito hero__efeito--dourado" />

      <div className="container hero__container">

        <div className="hero__conteudo">

          <span className="hero__tag">
            AÇAÍ BOMBA
          </span>

          <h1 className="hero__titulo">
            <span className="hero__titulo-branco">
              SEU AÇAÍ,
            </span>

            <span className="hero__titulo-dourado">
              SUAS REGRAS.
            </span>
          </h1>

          <h2 className="hero__subtitulo">
            Mais que açaí, é atitude.
          </h2>

          <p className="hero__descricao">
            Monte do seu jeito.
            Mais sabor, mais energia
            e mais momentos bons.
          </p>

          <Link to="/montar"  className="botao-dourado hero__botao">
            Montar meu açaí

            <ArrowRight size={19} />
          </Link>

        </div>

        <div className="hero__visual">

          <div className="hero__rabisco">
            MAIS QUE AÇAÍ,
            <br />
            É ATITUDE!
          </div>

          <div className="hero__circulo" />

          <div className="hero__produto-imagem">
            <img
              src="/images/hero/acai-hero.png"
              alt="Copo de açaí Açaí Bomba"
            />
          </div>

          <div className="hero__coroa">
            ♛
          </div>

        </div>

      </div>

      <div className="hero__faixa">

        <div className="container hero__beneficios">

          <div className="hero__beneficio">
            <Leaf size={22} />

            <div>
              <strong>
                Ingredientes
              </strong>

              <span>
                de qualidade
              </span>
            </div>
          </div>

          <div className="hero__beneficio">
            <Gem size={22} />

            <div>
              <strong>
                Sabor
              </strong>

              <span>
                inigualável
              </span>
            </div>
          </div>

          <div className="hero__beneficio">
            <MapPin size={22} />

            <div>
              <strong>
                Entrega
              </strong>

              <span>
                rápida
              </span>
            </div>
          </div>

          <div className="hero__beneficio">
            <Sparkles size={22} />

            <div>
              <strong>
                Feito
              </strong>

              <span>
                com atitude
              </span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;