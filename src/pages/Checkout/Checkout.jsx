import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { usePedido } from "../../context/PedidoContext";
import { contato } from "../../config/contato";

import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();

  const {
    carrinho,
    totalCarrinho,
  } = usePedido();

  const [tipoEntrega, setTipoEntrega] =
    useState("retirada");

  const [buscandoCep, setBuscandoCep] =
    useState(false);

  const [erroCep, setErroCep] =
    useState("");

  const [cliente, setCliente] =
    useState({
      nome: "",
      telefone: "",

      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",

      complemento: "",
      referencia: "",
      observacao: "",
    });

  function formatarPreco(valor) {
    return Number(valor).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );
  }

  function formatarTelefone(valor) {
    const numeros =
      valor
        .replace(/\D/g, "")
        .slice(0, 11);

    if (numeros.length <= 10) {
      return numeros
        .replace(
          /^(\d{2})(\d)/,
          "($1) $2"
        )
        .replace(
          /(\d{4})(\d)/,
          "$1-$2"
        );
    }

    return numeros
      .replace(
        /^(\d{2})(\d)/,
        "($1) $2"
      )
      .replace(
        /(\d{5})(\d)/,
        "$1-$2"
      );
  }

  function formatarCep(valor) {
    const numeros =
      valor
        .replace(/\D/g, "")
        .slice(0, 8);

    return numeros.replace(
      /^(\d{5})(\d)/,
      "$1-$2"
    );
  }

  async function buscarEnderecoPorCep(
    cep
  ) {
    const cepNumeros =
      cep.replace(/\D/g, "");

    if (cepNumeros.length !== 8) {
      return;
    }

    setBuscandoCep(true);
    setErroCep("");

    try {
      const resposta = await fetch(
        `https://viacep.com.br/ws/${cepNumeros}/json/`
      );

      if (!resposta.ok) {
        throw new Error(
          "Não foi possível consultar o CEP."
        );
      }

      const dados =
        await resposta.json();

      if (dados.erro) {
        setErroCep(
          "CEP não encontrado."
        );

        return;
      }

      setCliente(
        (dadosAtuais) => ({
          ...dadosAtuais,

          rua:
            dados.logradouro || "",

          bairro:
            dados.bairro || "",

          cidade:
            dados.localidade || "",

          estado:
            dados.uf || "",
        })
      );

      /*
        Depois de preencher o endereço,
        leva o foco direto para o número.
      */
      setTimeout(() => {
        document
          .getElementById("numero")
          ?.focus();
      }, 100);
    } catch (erro) {
      console.error(erro);

      setErroCep(
        "Não foi possível buscar o CEP. Preencha o endereço manualmente."
      );
    } finally {
      setBuscandoCep(false);
    }
  }

  function atualizarCampo(evento) {
    const {
      name,
      value,
    } = evento.target;

    /*
      TELEFONE
    */
    if (name === "telefone") {
      setCliente(
        (dadosAtuais) => ({
          ...dadosAtuais,

          telefone:
            formatarTelefone(
              value
            ),
        })
      );

      return;
    }

    /*
      CEP
    */
    if (name === "cep") {
      const cepFormatado =
        formatarCep(value);

      setCliente(
        (dadosAtuais) => ({
          ...dadosAtuais,

          cep:
            cepFormatado,
        })
      );

      setErroCep("");

      const cepNumeros =
        cepFormatado.replace(
          /\D/g,
          ""
        );

      /*
        Assim que chegar aos 8 números,
        o endereço é buscado sozinho.
      */
      if (
        cepNumeros.length === 8
      ) {
        buscarEnderecoPorCep(
          cepNumeros
        );
      }

      return;
    }

    /*
      OUTROS CAMPOS
    */
    setCliente(
      (dadosAtuais) => ({
        ...dadosAtuais,
        [name]: value,
      })
    );
  }

  function montarMensagemWhatsapp() {
    let mensagem = "";

    mensagem +=
      `*NOVO PEDIDO - ${contato.nome.toUpperCase()}*\n`;

    mensagem +=
      `--------------------------------\n\n`;

    mensagem +=
      `*DADOS DO CLIENTE*\n`;

    mensagem +=
      `*Cliente:* ${cliente.nome}\n`;

    mensagem +=
      `*Telefone:* ${cliente.telefone}\n\n`;

    mensagem +=
      `*PEDIDO*\n`;

    mensagem +=
      `--------------------------------\n\n`;

    carrinho.forEach(
      (item, indice) => {
        const quantidade =
          item.quantidade || 1;

        const tamanho =
          item.tamanho?.nome || "";

        const complementos =
          item.complementos || [];

        mensagem +=
          `*${quantidade}x Açaí Bomba - ${tamanho}*\n`;

        if (
          complementos.length >
          0
        ) {
          const textoComplementos =
            complementos
              .map(
                (
                  complemento
                ) => {
                  if (
                    Number(
                      complemento.preco
                    ) > 0
                  ) {
                    return (
                      `${complemento.nome} ` +
                      `(+ ${formatarPreco(
                        complemento.preco
                      )})`
                    );
                  }

                  return complemento.nome;
                }
              )
              .join(", ");

          mensagem +=
            quantidade > 1
              ? `*Complementos em cada unidade:* ${textoComplementos}\n`
              : `*Complementos:* ${textoComplementos}\n`;
        } else {
          mensagem +=
            `_Sem complementos_\n`;
        }

        const subtotal =
          item.precoUnitario *
          quantidade;

        mensagem +=
          `*Subtotal:* ${formatarPreco(
            subtotal
          )}\n`;

        if (
          indice <
          carrinho.length - 1
        ) {
          mensagem +=
            `\n--------------------------------\n\n`;
        }
      }
    );

    mensagem +=
      `\n================================\n`;

    mensagem +=
      `*TOTAL: ${formatarPreco(
        totalCarrinho
      )}*\n`;

    mensagem +=
      `================================\n\n`;

    mensagem +=
      `*FORMA DE RECEBIMENTO*\n`;

    if (
      tipoEntrega === "retirada"
    ) {
      mensagem +=
        `Retirada no local\n`;
    }

    if (
      tipoEntrega === "entrega"
    ) {
      mensagem +=
        `Entrega\n\n`;

      mensagem +=
        `*ENDEREÇO DE ENTREGA*\n`;

      mensagem +=
        `${cliente.rua}, ${cliente.numero}\n`;

      mensagem +=
        `${cliente.bairro}\n`;

      if (
        cliente.cidade ||
        cliente.estado
      ) {
        mensagem +=
          `${cliente.cidade}`;

        if (cliente.estado) {
          mensagem +=
            ` - ${cliente.estado}`;
        }

        mensagem += "\n";
      }

      if (cliente.cep) {
        mensagem +=
          `CEP: ${cliente.cep}\n`;
      }

      if (
        cliente.complemento.trim()
      ) {
        mensagem +=
          `Complemento: ${cliente.complemento}\n`;
      }

      if (
        cliente.referencia.trim()
      ) {
        mensagem +=
          `Referência: ${cliente.referencia}\n`;
      }

      mensagem +=
        `\n_Taxa de entrega a confirmar._\n`;
    }

    if (
      cliente.observacao.trim()
    ) {
      mensagem +=
        `\n--------------------------------\n\n`;

      mensagem +=
        `*OBSERVAÇÕES*\n`;

      mensagem +=
        `${cliente.observacao}\n`;
    }

    mensagem +=
      `\n--------------------------------\n`;

    mensagem +=
      `_Pedido realizado pelo cardápio digital do ${contato.nome}._`;

    return mensagem;
  }

  function finalizarPedido() {
    if (!cliente.nome.trim()) {
      alert(
        "Informe seu nome."
      );

      return;
    }

    if (
      !cliente.telefone.trim()
    ) {
      alert(
        "Informe seu telefone."
      );

      return;
    }

    const telefoneNumeros =
      cliente.telefone.replace(
        /\D/g,
        ""
      );

    if (
      telefoneNumeros.length <
        10 ||
      telefoneNumeros.length >
        11
    ) {
      alert(
        "Informe um telefone válido com DDD."
      );

      return;
    }

    if (
      tipoEntrega === "entrega"
    ) {
      if (
        !cliente.cep.trim()
      ) {
        alert(
          "Informe o CEP para entrega."
        );

        return;
      }

      if (
        !cliente.rua.trim() ||
        !cliente.numero.trim() ||
        !cliente.bairro.trim()
      ) {
        alert(
          "Preencha rua, número e bairro para entrega."
        );

        return;
      }
    }

    if (
      carrinho.length === 0
    ) {
      alert(
        "Seu carrinho está vazio."
      );

      navigate("/montar");

      return;
    }

    const mensagem =
      montarMensagemWhatsapp();

    const mensagemCodificada =
      encodeURIComponent(
        mensagem
      );

    const url =
      `https://wa.me/${contato.whatsapp}?text=${mensagemCodificada}`;

    window.open(
      url,
      "_blank"
    );
  }

  return (
    <section className="checkout">

      <div className="container">

        <header className="checkout__cabecalho">

          <span>
            FINALIZAR PEDIDO
          </span>

          <h1>
            Quase lá
          </h1>

          <p>
            Informe seus dados e
            escolha como deseja
            receber seu pedido.
          </p>

        </header>

        <div className="checkout__layout">

          <div className="checkout__principal">

            {/* RECEBIMENTO */}

            <section className="checkout__secao">

              <div className="checkout__secao-cabecalho">

                <span>
                  PASSO 01
                </span>

                <h2>
                  Como você quer receber?
                </h2>

              </div>

              <div className="checkout__opcoes">

                <button
                  type="button"
                  className={
                    tipoEntrega ===
                    "retirada"
                      ? "checkout__opcao checkout__opcao--ativa"
                      : "checkout__opcao"
                  }
                  onClick={() =>
                    setTipoEntrega(
                      "retirada"
                    )
                  }
                >

                  <span className="checkout__opcao-icone">
                    🏪
                  </span>

                  <div>

                    <strong>
                      Retirar no local
                    </strong>

                    <p>
                      Retire seu pedido
                      diretamente no
                      Açaí Bomba.
                    </p>

                  </div>

                </button>

                <button
                  type="button"
                  className={
                    tipoEntrega ===
                    "entrega"
                      ? "checkout__opcao checkout__opcao--ativa"
                      : "checkout__opcao"
                  }
                  onClick={() =>
                    setTipoEntrega(
                      "entrega"
                    )
                  }
                >

                  <span className="checkout__opcao-icone">
                    🛵
                  </span>

                  <div>

                    <strong>
                      Entrega
                    </strong>

                    <p>
                      Receba seu pedido
                      no endereço
                      informado.
                    </p>

                  </div>

                </button>

              </div>

            </section>

            {/* DADOS */}

            <section className="checkout__secao">

              <div className="checkout__secao-cabecalho">

                <span>
                  PASSO 02
                </span>

                <h2>
                  Seus dados
                </h2>

              </div>

              <div className="checkout__campos">

                <div className="checkout__campo">

                  <label htmlFor="nome">
                    Nome *
                  </label>

                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Digite seu nome"
                    value={
                      cliente.nome
                    }
                    onChange={
                      atualizarCampo
                    }
                  />

                </div>

                <div className="checkout__campo">

                  <label htmlFor="telefone">
                    Telefone / WhatsApp *
                  </label>

                  <input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="(11) 99999-9999"
                    value={
                      cliente.telefone
                    }
                    onChange={
                      atualizarCampo
                    }
                  />

                </div>

              </div>

            </section>

            {/* ENDEREÇO */}

            {tipoEntrega ===
              "entrega" && (

              <section className="checkout__secao">

                <div className="checkout__secao-cabecalho">

                  <span>
                    PASSO 03
                  </span>

                  <h2>
                    Endereço de entrega
                  </h2>

                </div>

                <div className="checkout__campos">

                  {/* CEP */}

                  <div className="checkout__campo">

                    <label htmlFor="cep">
                      CEP *
                    </label>

                    <div className="checkout__cep">

                      <input
                        id="cep"
                        name="cep"
                        type="text"
                        inputMode="numeric"
                        placeholder="00000-000"
                        value={
                          cliente.cep
                        }
                        onChange={
                          atualizarCampo
                        }
                        maxLength={9}
                      />

                      {buscandoCep && (
                        <span className="checkout__cep-status">
                          Buscando...
                        </span>
                      )}

                    </div>

                    {erroCep && (
                      <span className="checkout__cep-erro">
                        {erroCep}
                      </span>
                    )}

                    {!erroCep &&
                      cliente.cep
                        .replace(
                          /\D/g,
                          ""
                        )
                        .length <
                        8 && (
                        <small className="checkout__cep-ajuda">
                          Digite o CEP para
                          preencher o endereço
                          automaticamente.
                        </small>
                      )}

                  </div>

                  {/* RUA */}

                  <div className="checkout__campo">

                    <label htmlFor="rua">
                      Rua *
                    </label>

                    <input
                      id="rua"
                      name="rua"
                      type="text"
                      placeholder="Nome da rua"
                      value={
                        cliente.rua
                      }
                      onChange={
                        atualizarCampo
                      }
                    />

                  </div>

                  {/* NÚMERO / BAIRRO */}

                  <div className="checkout__linha">

                    <div className="checkout__campo">

                      <label htmlFor="numero">
                        Número *
                      </label>

                      <input
                        id="numero"
                        name="numero"
                        type="text"
                        placeholder="123"
                        value={
                          cliente.numero
                        }
                        onChange={
                          atualizarCampo
                        }
                      />

                    </div>

                    <div className="checkout__campo">

                      <label htmlFor="bairro">
                        Bairro *
                      </label>

                      <input
                        id="bairro"
                        name="bairro"
                        type="text"
                        placeholder="Seu bairro"
                        value={
                          cliente.bairro
                        }
                        onChange={
                          atualizarCampo
                        }
                      />

                    </div>

                  </div>

                  {/* CIDADE / UF */}

                  <div className="checkout__linha">

                    <div className="checkout__campo">

                      <label htmlFor="cidade">
                        Cidade
                      </label>

                      <input
                        id="cidade"
                        name="cidade"
                        type="text"
                        placeholder="Cidade"
                        value={
                          cliente.cidade
                        }
                        onChange={
                          atualizarCampo
                        }
                      />

                    </div>

                    <div className="checkout__campo">

                      <label htmlFor="estado">
                        Estado
                      </label>

                      <input
                        id="estado"
                        name="estado"
                        type="text"
                        placeholder="UF"
                        maxLength={2}
                        value={
                          cliente.estado
                        }
                        onChange={
                          atualizarCampo
                        }
                      />

                    </div>

                  </div>

                  {/* COMPLEMENTO */}

                  <div className="checkout__campo">

                    <label htmlFor="complemento">
                      Complemento
                    </label>

                    <input
                      id="complemento"
                      name="complemento"
                      type="text"
                      placeholder="Casa, bloco, apartamento..."
                      value={
                        cliente.complemento
                      }
                      onChange={
                        atualizarCampo
                      }
                    />

                  </div>

                  {/* REFERÊNCIA */}

                  <div className="checkout__campo">

                    <label htmlFor="referencia">
                      Ponto de referência
                    </label>

                    <input
                      id="referencia"
                      name="referencia"
                      type="text"
                      placeholder="Próximo a..."
                      value={
                        cliente.referencia
                      }
                      onChange={
                        atualizarCampo
                      }
                    />

                  </div>

                </div>

                <p className="checkout__aviso-entrega">
                  A taxa de entrega será
                  confirmada pelo WhatsApp.
                </p>

              </section>
            )}

            {/* OBSERVAÇÕES */}

            <section className="checkout__secao">

              <div className="checkout__secao-cabecalho">

                <span>
                  {tipoEntrega ===
                  "entrega"
                    ? "PASSO 04"
                    : "PASSO 03"}
                </span>

                <h2>
                  Observações
                </h2>

              </div>

              <div className="checkout__campo">

                <textarea
                  name="observacao"
                  rows="4"
                  placeholder="Alguma observação sobre o pedido?"
                  value={
                    cliente.observacao
                  }
                  onChange={
                    atualizarCampo
                  }
                />

              </div>

            </section>

          </div>

          {/* RESUMO */}

          <aside className="checkout__resumo">

            <div className="checkout__resumo-cabecalho">

              <span>
                SEU PEDIDO
              </span>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/carrinho"
                  )
                }
              >
                Editar
              </button>

            </div>

            <div className="checkout__itens">

              {carrinho.map(
                (item) => (

                  <div
                    className="checkout__item"
                    key={item.id}
                  >

                    <div>

                      <strong>
                        {item.quantidade}x{" "}
                        Açaí Bomba
                      </strong>

                      <span>
                        {
                          item.tamanho
                            .nome
                        }
                      </span>

                    </div>

                    <strong>
                      {formatarPreco(
                        item.precoUnitario *
                        item.quantidade
                      )}
                    </strong>

                  </div>

                )
              )}

            </div>

            <div className="checkout__total">

              <span>
                Total dos produtos
              </span>

              <strong>
                {formatarPreco(
                  totalCarrinho
                )}
              </strong>

            </div>

            {tipoEntrega ===
              "entrega" && (

              <p className="checkout__taxa">
                + taxa de entrega a
                confirmar
              </p>

            )}

            <button
              type="button"
              className="botao-dourado checkout__finalizar"
              onClick={
                finalizarPedido
              }
            >
              Enviar pedido pelo WhatsApp
            </button>

            <p className="checkout__whatsapp-aviso">
              Você poderá conferir a
              mensagem antes de enviá-la.
            </p>

          </aside>

        </div>

      </div>

    </section>
  );
}