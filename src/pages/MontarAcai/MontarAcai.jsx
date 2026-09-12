import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
  Plus,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  bases,
  categoriasComplementos,
  complementos,
  tamanhos,
} from "../../data/acai";

import { usePedido } from "../../context/PedidoContext";

import "./MontarAcai.css";

function MontarAcai() {
  const [etapa, setEtapa] =
    useState(1);

  const [
    bombaAtiva,
    setBombaAtiva,
  ] = useState(null);

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const {
    tamanho,
    setTamanho,

    base,
    setBase,

    complementosSelecionados,
    alternarComplemento,

    quantidade,
    setQuantidade,

    total,

    adicionarAoCarrinho,

    aplicarBomba,
    itemEmEdicaoId,
  } = usePedido();

  useEffect(() => {
    const bomba =
      location.state
        ?.bombaSelecionada;

    if (!bomba) {
      return;
    }

    setBombaAtiva(bomba);

    const complementosDaBomba =
      complementos.filter(
        (complemento) =>
          bomba.ingredientes.includes(
            complemento.nome
          )
      );

    aplicarBomba(
      complementosDaBomba
    );

    setEtapa(1);

    navigate(
      location.pathname,
      {
        replace: true,
        state: null,
      }
    );
  }, []);

  function finalizarMontagem() {
    adicionarAoCarrinho(
      bombaAtiva
    );

    navigate("/carrinho");
  }

  function formatarPreco(valor) {
    return valor.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );
  }

  function avancar() {
    if (
      etapa === 1 &&
      (!tamanho || !base)
    ) {
      return;
    }

    setEtapa(
      (atual) =>
        Math.min(
          atual + 1,
          3
        )
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function voltar() {
    setEtapa(
      (atual) =>
        Math.max(
          atual - 1,
          1
        )
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function aumentarQuantidade() {
    setQuantidade(
      (atual) =>
        Math.min(
          atual + 1,
          10
        )
    );
  }

  function diminuirQuantidade() {
    setQuantidade(
      (atual) =>
        Math.max(
          atual - 1,
          1
        )
    );
  }

  return (
    <section className="montador">

      <div className="container">

        {bombaAtiva && (
          <div className="montador__bomba">

            <div className="montador__bomba-conteudo">

              <span className="montador__bomba-selo">
                BOMBA DA CASA
              </span>

              <div>

                <p>
                  Você escolheu
                </p>

                <h2>
                  {bombaAtiva.nome}
                </h2>

                <span className="montador__bomba-ingredientes">
                  {bombaAtiva.ingredientes.join(
                    " • "
                  )}
                </span>

              </div>

            </div>

            <p className="montador__bomba-aviso">
              A combinação já foi
              preparada para você.
              Escolha o tamanho, a base
              e personalize os complementos
              como quiser.
            </p>

          </div>
        )}

        <div className="montador__progresso">

          {[1, 2, 3].map(
            (numero) => (
              <div
                className="montador__etapa"
                key={numero}
              >

                <span
                  className={
                    etapa >= numero
                      ? "montador__numero montador__numero--ativo"
                      : "montador__numero"
                  }
                >
                  {etapa >
                  numero ? (
                    <Check
                      size={17}
                    />
                  ) : (
                    numero
                  )}
                </span>

                <small>
                  {numero ===
                    1 &&
                    "Tamanho e base"}

                  {numero ===
                    2 &&
                    "Complementos"}

                  {numero ===
                    3 &&
                    "Resumo"}
                </small>

              </div>
            )
          )}

        </div>

        {etapa === 1 && (
          <div className="montador__conteudo">

            <header className="montador__cabecalho">

              <span>
                PASSO 01
              </span>

              <h1>
                Monte a base do seu copo
              </h1>

              <p>
                Escolha primeiro o tamanho
                e depois como você quer a base.
              </p>

            </header>

            <div className="montador__bloco">

              <div className="montador__subtitulo">
                <span>1</span>

                <div>
                  <h2>
                    Escolha o tamanho
                  </h2>

                  <p>
                    Selecione o volume do seu copo.
                  </p>
                </div>
              </div>

              <div className="montador__tamanhos">

                {tamanhos.map(
                  (item) => {
                    const selecionado =
                      tamanho?.id ===
                      item.id;

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
                          setTamanho(
                            item
                          )
                        }
                      >

                        {item.destaque && (
                          <span className="tamanho__destaque">
                            Mais pedido
                          </span>
                        )}

                        <span className="tamanho__volume">
                          {item.nome}
                        </span>

                        <strong>
                          {formatarPreco(
                            item.preco
                          )}
                        </strong>

                        <p>
                          {
                            item.descricao
                          }
                        </p>

                        <span className="tamanho__seletor">

                          {selecionado && (
                            <Check
                              size={17}
                            />
                          )}

                        </span>

                      </button>
                    );
                  }
                )}

              </div>

            </div>

            <div className="montador__bloco montador__bloco--base">

              <div className="montador__subtitulo">
                <span>2</span>

                <div>
                  <h2>
                    Escolha sua base
                  </h2>

                  <p>
                    Essa escolha é obrigatória para preparar o copo corretamente.
                  </p>
                </div>
              </div>

              <div className="montador__bases">

                {bases.map(
                  (item) => {
                    const selecionado =
                      base?.id ===
                      item.id;

                    return (
                      <button
                        type="button"
                        key={item.id}
                        className={
                          selecionado
                            ? "base base--selecionada"
                            : "base"
                        }
                        onClick={() =>
                          setBase(item)
                        }
                      >
                        <span className="base__icone">
                          {item.id === "acai" && "🟣"}
                          {item.id === "cupuacu" && "🟡"}
                          {item.id === "meio-a-meio" && "🟣🟡"}
                        </span>

                        <strong>
                          {item.nome}
                        </strong>

                        <p>
                          {item.descricao}
                        </p>

                        <span className="base__seletor">
                          {selecionado && (
                            <Check
                              size={17}
                            />
                          )}
                        </span>
                      </button>
                    );
                  }
                )}

              </div>

            </div>

            <div className="montador__navegacao montador__navegacao--fim">

              <button
                type="button"
                className="botao-dourado"
                disabled={
                  !tamanho ||
                  !base
                }
                onClick={avancar}
              >
                Continuar

                <ArrowRight
                  size={18}
                />
              </button>

            </div>

          </div>
        )}

        {etapa === 2 && (
          <div className="montador__conteudo">

            <header className="montador__cabecalho">

              <span>
                PASSO 02
              </span>

              <h1>
                Escolha os complementos
              </h1>

              <p>
                {bombaAtiva
                  ? `Os complementos da ${bombaAtiva.nome} já estão selecionados. Você pode alterar como quiser.`
                  : "Agora deixe seu copo exatamente do seu jeito."}
              </p>

            </header>

            <div className="montador__categorias">

              {categoriasComplementos.map(
                (categoria) => (
                  <div
                    className="categoria"
                    key={
                      categoria
                    }
                  >

                    <h2>
                      {categoria}
                    </h2>

                    <div className="categoria__grid">

                      {complementos
                        .filter(
                          (
                            item
                          ) =>
                            item.categoria ===
                            categoria
                        )
                        .map(
                          (
                            item
                          ) => {
                            const selecionado =
                              complementosSelecionados.some(
                                (
                                  selecionado
                                ) =>
                                  selecionado.id ===
                                  item.id
                              );

                            return (
                              <button
                                type="button"
                                key={
                                  item.id
                                }
                                className={
                                  selecionado
                                    ? "complemento complemento--selecionado"
                                    : "complemento"
                                }
                                onClick={() =>
                                  alternarComplemento(
                                    item
                                  )
                                }
                              >

                                <span className="complemento__icone">
                                  {item.nome.charAt(
                                    0
                                  )}
                                </span>

                                <strong>
                                  {
                                    item.nome
                                  }
                                </strong>

                                <small>
                                  {item.preco >
                                  0
                                    ? `+ ${formatarPreco(
                                        item.preco
                                      )}`
                                    : "Incluso"}
                                </small>

                                <span className="complemento__check">

                                  {selecionado && (
                                    <Check
                                      size={
                                        15
                                      }
                                    />
                                  )}

                                </span>

                              </button>
                            );
                          }
                        )}

                    </div>

                  </div>
                )
              )}

            </div>

            <div className="montador__navegacao">

              <button
                type="button"
                className="montador__voltar"
                onClick={voltar}
              >
                <ArrowLeft
                  size={17}
                />

                Voltar
              </button>

              <button
                type="button"
                className="botao-dourado"
                onClick={avancar}
              >
                Ver resumo

                <ArrowRight
                  size={18}
                />
              </button>

            </div>

          </div>
        )}

        {etapa === 3 && (
          <div className="montador__conteudo">

            <header className="montador__cabecalho">

              <span>
                PASSO 03
              </span>

              <h1>
                {bombaAtiva
                  ? bombaAtiva.nome
                  : "Seu Açaí Bomba"}
              </h1>

              <p>
                Confira se está tudo
                do jeito que você quer.
              </p>

            </header>

            <div className="resumo">

              <div className="resumo__principal">

                <div className="resumo__grupo">

                  <span>
                    Tamanho
                  </span>

                  <strong>
                    {tamanho?.nome}
                  </strong>

                  <button
                    type="button"
                    onClick={() =>
                      setEtapa(1)
                    }
                  >
                    Alterar
                  </button>

                </div>

                <div className="resumo__grupo">

                  <span>
                    Base
                  </span>

                  <strong>
                    {base?.nome}
                  </strong>

                  <button
                    type="button"
                    onClick={() =>
                      setEtapa(1)
                    }
                  >
                    Alterar
                  </button>

                </div>

                <div className="resumo__grupo">

                  <div className="resumo__grupo-cabecalho">

                    <span>
                      Complementos
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setEtapa(2)
                      }
                    >
                      Alterar
                    </button>

                  </div>

                  {complementosSelecionados.length ===
                  0 ? (
                    <p className="resumo__vazio">
                      Nenhum complemento
                      selecionado.
                    </p>
                  ) : (
                    <div className="resumo__complementos">

                      {complementosSelecionados.map(
                        (
                          item
                        ) => (
                          <span
                            key={
                              item.id
                            }
                          >
                            {
                              item.nome
                            }

                            {item.preco >
                              0 && (
                              <small>
                                +{" "}
                                {formatarPreco(
                                  item.preco
                                )}
                              </small>
                            )}
                          </span>
                        )
                      )}

                    </div>
                  )}

                </div>

                <div className="resumo__quantidade">

                  <span>
                    Quantidade
                  </span>

                  <div>

                    <button
                      type="button"
                      onClick={
                        diminuirQuantidade
                      }
                    >
                      <Minus
                        size={
                          16
                        }
                      />
                    </button>

                    <strong>
                      {quantidade}
                    </strong>

                    <button
                      type="button"
                      onClick={
                        aumentarQuantidade
                      }
                    >
                      <Plus
                        size={
                          16
                        }
                      />
                    </button>

                  </div>

                </div>

              </div>

              <aside className="resumo__valor">

                <span>
                  TOTAL DO PEDIDO
                </span>

                <strong>
                  {formatarPreco(
                    total
                  )}
                </strong>

                <p>
                  O pedido ainda será
                  confirmado pela loja
                  no WhatsApp.
                </p>

                <button
                  type="button"
                  className="botao-dourado resumo__continuar"
                  onClick={
                    finalizarMontagem
                  }
                >
                  {itemEmEdicaoId
                    ? "Salvar alterações"
                    : "Continuar pedido"}

                  <ArrowRight
                    size={18}
                  />
                </button>

              </aside>

            </div>

            <div className="montador__navegacao">

              <button
                type="button"
                className="montador__voltar"
                onClick={voltar}
              >
                <ArrowLeft
                  size={17}
                />

                Voltar
              </button>

            </div>

          </div>
        )}

      </div>

    </section>
  );
}

export default MontarAcai;