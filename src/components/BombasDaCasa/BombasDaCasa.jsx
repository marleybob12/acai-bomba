import { useNavigate } from "react-router-dom";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./BombasDaCasa.css";

const bombas = [
  {
    id: 1,
    nome: "Bomba Explosiva",
    imagem:
      "/images/bombas/bomba-explosiva.jpg",
    ingredientes: [
      "Leite Ninho",
      "Oreo",
      "Nutella",
    ],
    descricao:
      "Uma explosão de cremosidade e chocolate.",
  },
  {
    id: 2,
    nome: "Bomba de Morango",
    imagem:
      "/images/bombas/bomba-morango.jpg",
    ingredientes: [
      "Morango",
      "Leite Ninho",
      "Leite Condensado",
    ],
    descricao:
      "Morango, cremosidade e aquele toque doce na medida.",
  },
  {
    id: 3,
    nome: "Bomba Crocante",
    imagem:
      "/images/bombas/bomba-crocante.jpg",
    ingredientes: [
      "Paçoca",
      "Granola",
      "Chocoball",
      "Brigadeiro",
    ],
    descricao:
      "Crocância e chocolate em cada colherada.",
  },
  {
    id: 4,
    nome: "Bomba Chocolate",
    imagem:
      "/images/bombas/bomba-chocolate.jpg",
    ingredientes: [
      "Nutella",
      "Oreo",
      "Brigadeiro",
    ],
    descricao:
      "Para quem acredita que chocolate nunca é demais.",
  },
];

function BombasDaCasa() {
  const navigate = useNavigate();

  const secaoRef = useRef(null);

const [visivel, setVisivel] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setVisivel(true);

        observer.disconnect();
      }
    },
    {
      threshold: 0.15,
    }
  );

  if (secaoRef.current) {
    observer.observe(secaoRef.current);
  }

  return () => {
    observer.disconnect();
  };
}, []);

  function montarBomba(bomba) {
    navigate("/montar", {
      state: {
        bombaSelecionada: bomba,
      },
    });
  }

  return (
    <section
  ref={secaoRef}
  className="bombas" id="mais-pedidos">
      <div className="container">

       <header
  className={`
    bombas__cabecalho
    ${visivel ? "bombas__cabecalho--visivel" : ""}
  `}
> 

          <span>
            AS FAVORITAS
          </span>

          <h2>
            Bombas da Casa
          </h2>

          <p>
            Combinações pensadas para quem
            quer pedir rápido sem abrir mão
            de muito sabor.
          </p>

        </header>

       <div
  className={`
    bombas__grid
    ${visivel ? "bombas__grid--visivel" : ""}
  `}
>

          {bombas.map((bomba) => (
            <article
              className="bomba-card"
              key={bomba.id}
            >

              <div className="bomba-card__imagem">

                <img
                  src={bomba.imagem}
                  alt={bomba.nome}
                  loading="lazy"
                />

                <span className="bomba-card__selo">
                  DA CASA
                </span>

              </div>

              <div className="bomba-card__conteudo">

                <span className="bomba-card__numero">
                  0{bomba.id}
                </span>

                <h3>
                  {bomba.nome}
                </h3>

                <p className="bomba-card__ingredientes">
                  {bomba.ingredientes.join(
                    " • "
                  )}
                </p>

                <p className="bomba-card__descricao">
                  {bomba.descricao}
                </p>

                <button
                  type="button"
                  className="bomba-card__botao"
                  onClick={() =>
                    montarBomba(bomba)
                  }
                >
                  Montar essa bomba
                </button>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default BombasDaCasa;