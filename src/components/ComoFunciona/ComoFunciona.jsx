import {
  MessageCircle,
  SlidersHorizontal,
  CupSoda,
} from "lucide-react";

import "./ComoFunciona.css";

function ComoFunciona() {
  return (
    <section
      className="como-funciona"
      id="como-funciona"
    >
      <div className="como-funciona__efeito" />

      <div className="container como-funciona__container">

        <div className="como-funciona__cabecalho">

          <span className="como-funciona__tag">
            SIMPLES E RÁPIDO
          </span>

          <h2 className="como-funciona__titulo">
            COMO FUNCIONA
          </h2>

          <p className="como-funciona__descricao">
            Monte do seu jeito,
            em poucos passos.
          </p>

        </div>

        <div className="como-funciona__cards">

          <article className="passo">

            <div className="passo__topo">

              <span className="passo__numero">
                1
              </span>

              <CupSoda
                className="passo__icone"
                size={28}
              />

            </div>

            <h3>
              Escolha o tamanho
            </h3>

            <p>
              Escolha entre os tamanhos
              disponíveis de acordo com
              a sua vontade.
            </p>

          </article>

          <article className="passo passo--destaque">

            <div className="passo__topo">

              <span className="passo__numero">
                2
              </span>

              <SlidersHorizontal
                className="passo__icone"
                size={28}
              />

            </div>

            <h3>
              Adicione os complementos
            </h3>

            <p>
              Frutas, cremes, granulados
              e adicionais para deixar
              seu açaí do seu jeito.
            </p>

          </article>

          <article className="passo">

            <div className="passo__topo">

              <span className="passo__numero">
                3
              </span>

              <MessageCircle
                className="passo__icone"
                size={28}
              />

            </div>

            <h3>
              Finalize no WhatsApp
            </h3>

            <p>
              Revise o pedido e envie
              tudo organizado diretamente
              para a loja.
            </p>

          </article>

        </div>

      </div>
    </section>
  );
}

export default ComoFunciona;