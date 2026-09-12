import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Pencil,
  Plus,
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
  const navigate =
    useNavigate();

  const {
    carrinho,

    removerDoCarrinho,

    alterarQuantidadeCarrinho,

    iniciarEdicaoCarrinho,

    limparMontagem,

    totalCarrinho,

    quantidadeTotalCarrinho,
  } = usePedido();

  function formatarPreco(valor) {
    return Number(valor).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );
  }

  function editarItem(id) {
    iniciarEdicaoCarrinho(id);

    navigate("/montar", {
      state: {
        editandoCarrinho: true,
      },
    });
  }

  return (
    <section className="carrinho">

      <div className="container">

        {/* CABEÇALHO */}

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

        {/* CARRINHO VAZIO */}

        {carrinho.length === 0 ? (

          <div className="carrinho__vazio">

            <ShoppingBag
              size={42}
            />

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
              onClick={
                limparMontagem
              }
            >
              Montar meu açaí

              <ArrowRight
                size={18}
              />
            </Link>

          </div>

        ) : (

          <div className="carrinho__layout">

            {/* ITENS */}

            <div className="carrinho__itens">

              {carrinho.map(
                (
                  item,
                  indice
                ) => {

                  const subtotal =
                    item.precoUnitario *
                    item.quantidade;

                  return (
                    <article
                      className="item-carrinho"
                      key={item.id}
                    >

                      {/* NÚMERO */}

                      <div className="item-carrinho__numero">
                        {indice + 1}
                      </div>

                      {/* CONTEÚDO */}

                      <div className="item-carrinho__conteudo">

                        {/* TOPO */}

                        <div className="item-carrinho__topo">

                          <div>

                         <span>
  {item.nomeProduto ||
    "Açaí Bomba personalizado"}
</span>

<h2>
  {item.tamanho.nome}
</h2>

                          </div>

                          {/* AÇÕES */}

                          <div className="item-carrinho__acoes">

                            <button
                              type="button"
                              className="item-carrinho__editar"
                              onClick={() =>
                                editarItem(
                                  item.id
                                )
                              }
                              aria-label="Editar montagem"
                              title="Editar montagem"
                            >
                              <Pencil
                                size={16}
                              />
                            </button>

                            <button
                              type="button"
                              className="item-carrinho__remover"
                              onClick={() =>
                                removerDoCarrinho(
                                  item.id
                                )
                              }
                              aria-label="Remover item"
                              title="Remover item"
                            >
                              <Trash2
                                size={17}
                              />
                            </button>

                          </div>

                        </div>

                        {/* COMPLEMENTOS */}

                        <div className="item-carrinho__complementos">

                          {item.complementos.length ===
                          0 ? (

                            <span className="item-carrinho__sem-complementos">
                              Sem complementos
                            </span>

                          ) : (

                            item.complementos.map(
                              (
                                complemento
                              ) => (

                                <span
                                  key={
                                    complemento.id
                                  }
                                >
                                  {
                                    complemento.nome
                                  }

                                  {complemento.preco >
                                    0 && (

                                    <small>
                                      +{" "}
                                      {formatarPreco(
                                        complemento.preco
                                      )}
                                    </small>

                                  )}

                                </span>

                              )
                            )

                          )}

                        </div>

                        {/* RODAPÉ */}

                        <div className="item-carrinho__rodape">

                          {/* QUANTIDADE */}

                          <div className="item-carrinho__quantidade">

                            <span>
                              Quantidade
                            </span>

                            <div className="item-carrinho__controle">

                              <button
                                type="button"
                                onClick={() =>
                                  alterarQuantidadeCarrinho(
                                    item.id,
                                    -1
                                  )
                                }
                                disabled={
                                  item.quantidade <=
                                  1
                                }
                                aria-label="Diminuir quantidade"
                              >
                                <Minus
                                  size={15}
                                />
                              </button>

                              <strong>
                                {
                                  item.quantidade
                                }
                              </strong>

                              <button
                                type="button"
                                onClick={() =>
                                  alterarQuantidadeCarrinho(
                                    item.id,
                                    1
                                  )
                                }
                                disabled={
                                  item.quantidade >=
                                  10
                                }
                                aria-label="Aumentar quantidade"
                              >
                                <Plus
                                  size={15}
                                />
                              </button>

                            </div>

                          </div>

                          {/* PREÇO */}

                          <div className="item-carrinho__preco">

                            <span>
                              Subtotal
                            </span>

                            <strong>
                              {formatarPreco(
                                subtotal
                              )}
                            </strong>

                          </div>

                        </div>

                      </div>

                    </article>
                  );
                }
              )}

              {/* ADICIONAR OUTRO */}

              <Link
                to="/montar"
                className="carrinho__adicionar"
                onClick={
                  limparMontagem
                }
              >
                <Plus
                  size={16}
                />

                Adicionar outro açaí
              </Link>

            </div>

            {/* RESUMO */}

            <aside className="carrinho__resumo">

              <span>
                RESUMO
              </span>

              <div className="carrinho__resumo-linha">

                <span>
                  Quantidade de açaís
                </span>

                <strong>
                  {
                    quantidadeTotalCarrinho
                  }
                </strong>

              </div>

              <div className="carrinho__resumo-linha">

                <span>
                  Montagens
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
                  navigate(
                    "/checkout"
                  )
                }
              >
                Continuar

                <ArrowRight
                  size={18}
                />
              </button>

              <p>
                O pedido só será confirmado
                após o atendimento da loja
                pelo WhatsApp.
              </p>

            </aside>

          </div>
        )}

        {/* VOLTAR */}

        {carrinho.length > 0 && (

          <Link
            to="/montar"
            className="carrinho__voltar"
            onClick={
              limparMontagem
            }
          >
            <ArrowLeft
              size={17}
            />

            Voltar para montagem
          </Link>

        )}

      </div>

    </section>
  );
}

export default Carrinho;