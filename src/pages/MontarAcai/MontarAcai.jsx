import {
  ArrowRight,
  Check,
} from "lucide-react";

import {
  categoriasComplementos,
  complementos,
  tamanhos,
} from "../../data/acai";

import { usePedido } from "../../context/PedidoContext";

import "./MontarAcai.css";

function MontarAcai() {
  const {
    tamanho,
    setTamanho,

    complementosSelecionados,
    alternarComplemento,

    total,
  } = usePedido();

  function formatarPreco(valor) {
    return valor.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );
  }

  return (
    <section className="montador">

      <div className="container">

        <div className="montador__progresso">

          <span className="ativo">
            1
            <small>
              Tamanho
            </small>
          </span>

          <div />

          <span>
            2
            <small>
              Complementos
            </small>
          </span>

          <div />

          <span>
            3
            <small>
              Resumo
            </small>
          </span>

        </div>

        <div className="montador__layout">

          <div className="montador__principal">

            <header className="montador__cabecalho">

              <span>
                MONTE DO SEU JEITO
              </span>

              <h1>
                Escolha o tamanho
                do seu açaí
              </h1>

              <p>
                Comece escolhendo o tamanho
                que combina com a sua fome.
              </p>

            </header>

            <div className="montador__tamanhos">

              {tamanhos.map(
                (item) => {

                  const selecionado =
                    tamanho?.id === item.id;

                  return (
                    <button
                      type="button"
                      key={item.id}
                      className={
                        selecionado
                          ? "tamanho tamanho--selecionado"
                          : "tamanho"
                      }
                      onClick={() =>
                        setTamanho(item)
                      }
                    >

                      {item.destaque && (
                        <span className="tamanho__destaque">
                          Mais pedido
                        </span>
                      )}

                      <strong>
                        {item.nome}
                      </strong>

                      <b>
                        {formatarPreco(
                          item.preco
                        )}
                      </b>

                      <p>
                        {item.descricao}
                      </p>

                      {selecionado && (
                        <Check
                          className="tamanho__check"
                          size={20}
                        />
                      )}

                    </button>
                  );
                }
              )}

            </div>

            {tamanho && (
              <div className="montador__complementos">

                <header>
                  <span>
                    ETAPA 2
                  </span>

                  <h2>
                    Adicione seus
                    complementos
                  </h2>

                  <p>
                    Escolha tudo que quiser
                    colocar no seu açaí.
                  </p>
                </header>

                {categoriasComplementos.map(
                  (categoria) => (
                    <div
                      className="categoria"
                      key={categoria}
                    >

                      <h3>
                        {categoria}
                      </h3>

                      <div className="categoria__grid">

                        {complementos
                          .filter(
                            (complemento) =>
                              complemento.categoria ===
                              categoria
                          )
                          .map(
                            (complemento) => {

                              const selecionado =
                                complementosSelecionados.some(
                                  (item) =>
                                    item.id ===
                                    complemento.id
                                );

                              return (
                                <button
                                  type="button"
                                  key={
                                    complemento.id
                                  }
                                  className={
                                    selecionado
                                      ? "complemento complemento--selecionado"
                                      : "complemento"
                                  }
                                  onClick={() =>
                                    alternarComplemento(
                                      complemento
                                    )
                                  }
                                >

                                  <span className="complemento__icone">
                                    {complemento.nome
                                      .charAt(0)}
                                  </span>

                                  <strong>
                                    {
                                      complemento.nome
                                    }
                                  </strong>

                                  <small>
                                    {
                                      complemento.preco >
                                      0
                                        ? `+ ${formatarPreco(
                                            complemento.preco
                                          )}`
                                        : "Incluso"
                                    }
                                  </small>

                                  {selecionado && (
                                    <Check
                                      size={16}
                                    />
                                  )}

                                </button>
                              );
                            }
                          )}

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

          </div>

          <aside className="resumo-pedido">

            <span className="resumo-pedido__tag">
              SEU PEDIDO
            </span>

            <h2>
              Monte seu Açaí Bomba
            </h2>

            {!tamanho ? (
              <p className="resumo-pedido__vazio">
                Escolha um tamanho
                para começar.
              </p>
            ) : (
              <>
                <div className="resumo-pedido__linha">
                  <span>
                    Tamanho
                  </span>

                  <strong>
                    {tamanho.nome}
                  </strong>
                </div>

                <div className="resumo-pedido__linha">
                  <span>
                    Complementos
                  </span>

                  <strong>
                    {
                      complementosSelecionados.length
                    }
                  </strong>
                </div>

                <div className="resumo-pedido__selecionados">

                  {complementosSelecionados.map(
                    (item) => (
                      <span key={item.id}>
                        {item.nome}
                      </span>
                    )
                  )}

                </div>

                <div className="resumo-pedido__total">
                  <span>
                    Total
                  </span>

                  <strong>
                    {formatarPreco(total)}
                  </strong>
                </div>

                <button
                  type="button"
                  className="botao-dourado resumo-pedido__botao"
                >
                  Continuar

                  <ArrowRight size={18} />
                </button>
              </>
            )}

          </aside>

        </div>

      </div>

    </section>
  );
}

export default MontarAcai;