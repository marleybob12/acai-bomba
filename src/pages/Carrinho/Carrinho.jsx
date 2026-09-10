import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { usePedido } from "../../context/PedidoContext";

import "./Carrinho.css";

function Carrinho() {
  const navigate = useNavigate();

  const {
    carrinho,
    removerDoCarrinho,
    totalCarrinho,
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
    <section className="carrinho">

      <div className="container">

        <header className="carrinho__cabecalho">

          <span>
            SEU PEDIDO
          </span>

          <h1>
            Carrinho
          </h1>

          <p>
            Confira seus açaís antes
            de continuar.
          </p>

        </header>

        {carrinho.length === 0 ? (

          <div className="carrinho__vazio">

            <ShoppingBag size={42} />

            <h2>
              Seu carrinho está vazio
            </h2>

            <p>
              Monte seu Açaí Bomba
              para começar o pedido.
            </p>

            <Link
              to="/montar"
              className="botao-dourado"
            >
              Montar meu açaí

              <ArrowRight size={18} />
            </Link>

          </div>

        ) : (

          <div className="carrinho__layout">

            <div className="carrinho__itens">

              {carrinho.map(
                (item, indice) => (
                  <article
                    className="item-carrinho"
                    key={item.id}
                  >

                    <div className="item-carrinho__numero">
                      {indice + 1}
                    </div>

                    <div className="item-carrinho__conteudo">

                      <div className="item-carrinho__topo">

                        <div>
                          <span>
                            AÇAÍ BOMBA
                          </span>

                          <h2>
                            {item.tamanho.nome}
                          </h2>
                        </div>

                        <button
                          type="button"
                          className="item-carrinho__remover"
                          onClick={() =>
                            removerDoCarrinho(
                              item.id
                            )
                          }
                          aria-label="Remover item"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                      <div className="item-carrinho__complementos">

                        {item.complementos.length === 0 ? (
                          <span>
                            Sem complementos
                          </span>
                        ) : (
                          item.complementos.map(
                            (complemento) => (
                              <span
                                key={
                                  complemento.id
                                }
                              >
                                {
                                  complemento.nome
                                }
                              </span>
                            )
                          )
                        )}

                      </div>

                      <div className="item-carrinho__rodape">

                        <span>
                          Quantidade:
                          {" "}
                          <strong>
                            {item.quantidade}
                          </strong>
                        </span>

                        <strong>
                          {formatarPreco(
                            item.precoUnitario *
                            item.quantidade
                          )}
                        </strong>

                      </div>

                    </div>

                  </article>
                )
              )}

              <Link
                to="/montar"
                className="carrinho__adicionar"
              >
                + Adicionar outro açaí
              </Link>

            </div>

            <aside className="carrinho__resumo">

              <span>
                RESUMO
              </span>

              <div className="carrinho__resumo-linha">

                <span>
                  Itens
                </span>

                <strong>
                  {carrinho.length}
                </strong>

              </div>

              <div className="carrinho__total">

                <span>
                  Total
                </span>

                <strong>
                  {formatarPreco(
                    totalCarrinho
                  )}
                </strong>

              </div>

              <button
                type="button"
                className="botao-dourado carrinho__continuar"
                onClick={() =>
                  navigate("/checkout")
                }
              >
                Continuar

                <ArrowRight size={18} />
              </button>

              <p>
                O pedido só será confirmado
                após o atendimento da loja
                pelo WhatsApp.
              </p>

            </aside>

          </div>
        )}

        {carrinho.length > 0 && (
          <Link
            to="/montar"
            className="carrinho__voltar"
          >
            <ArrowLeft size={17} />

            Voltar para montagem
          </Link>
        )}

      </div>

    </section>
  );
}

export default Carrinho;