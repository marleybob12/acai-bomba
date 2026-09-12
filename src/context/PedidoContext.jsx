import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const PedidoContext =
  createContext(null);

const CHAVE_CARRINHO =
  "acai-bomba-carrinho";

const BASE_PADRAO = {
  id: "acai",
  nome: "Só Açaí",
  descricao: "Copo completo com açaí.",
};

function obterNomeBaseProduto(item) {
  if (item.nomeBaseProduto) {
    return item.nomeBaseProduto;
  }

  if (item.nomeProduto) {
    return item.nomeProduto.split(" • ")[0];
  }

  return "Açaí Bomba personalizado";
}

function carregarCarrinho() {
  if (
    typeof window ===
    "undefined"
  ) {
    return [];
  }

  try {
    const carrinhoSalvo =
      localStorage.getItem(
        CHAVE_CARRINHO
      );

    if (!carrinhoSalvo) {
      return [];
    }

    const dados =
      JSON.parse(
        carrinhoSalvo
      );

    if (!Array.isArray(dados)) {
      return [];
    }

    return dados.map(
      (item) => {
        const baseItem =
          item.base ||
          BASE_PADRAO;

        const nomeBaseProduto =
          obterNomeBaseProduto(
            item
          );

        return {
          ...item,
          base: baseItem,
          nomeBaseProduto,
          nomeProduto:
            `${nomeBaseProduto} • ${baseItem.nome}`,
        };
      }
    );
  } catch (erro) {
    console.error(
      "Erro ao carregar carrinho:",
      erro
    );

    return [];
  }
}

export function PedidoProvider({
  children,
}) {
  const [
    tamanho,
    setTamanho,
  ] = useState(null);

  const [
    base,
    setBase,
  ] = useState(null);

  const [
    complementosSelecionados,
    setComplementosSelecionados,
  ] = useState([]);

  const [
    quantidade,
    setQuantidade,
  ] = useState(1);

  const [
    carrinho,
    setCarrinho,
  ] = useState(
    carregarCarrinho
  );

  const [
    itemEmEdicaoId,
    setItemEmEdicaoId,
  ] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(
        CHAVE_CARRINHO,
        JSON.stringify(
          carrinho
        )
      );
    } catch (erro) {
      console.error(
        "Erro ao salvar carrinho:",
        erro
      );
    }
  }, [carrinho]);

  const total = useMemo(() => {
    if (!tamanho) {
      return 0;
    }

    const valorComplementos =
      complementosSelecionados.reduce(
        (
          soma,
          complemento
        ) =>
          soma +
          complemento.preco,
        0
      );

    return (
      tamanho.preco +
      valorComplementos
    ) * quantidade;
  }, [
    tamanho,
    complementosSelecionados,
    quantidade,
  ]);

  const totalCarrinho =
    useMemo(() => {
      return carrinho.reduce(
        (
          totalAtual,
          item
        ) =>
          totalAtual +
          item.precoUnitario *
            item.quantidade,
        0
      );
    }, [carrinho]);

  const quantidadeTotalCarrinho =
    useMemo(() => {
      return carrinho.reduce(
        (
          totalAtual,
          item
        ) =>
          totalAtual +
          item.quantidade,
        0
      );
    }, [carrinho]);

  function alternarComplemento(
    complemento
  ) {
    setComplementosSelecionados(
      (atuais) => {
        const jaSelecionado =
          atuais.some(
            (item) =>
              item.id ===
              complemento.id
          );

        if (jaSelecionado) {
          return atuais.filter(
            (item) =>
              item.id !==
              complemento.id
          );
        }

        return [
          ...atuais,
          complemento,
        ];
      }
    );
  }

  function aplicarBomba(
    complementosDaBomba
  ) {
    setItemEmEdicaoId(null);

    setTamanho(null);

    setBase(null);

    setComplementosSelecionados(
      complementosDaBomba
    );

    setQuantidade(1);
  }

  function limparMontagem() {
    setTamanho(null);

    setBase(null);

    setComplementosSelecionados(
      []
    );

    setQuantidade(1);

    setItemEmEdicaoId(null);
  }

  function iniciarEdicaoCarrinho(
    id
  ) {
    const item =
      carrinho.find(
        (item) =>
          item.id === id
      );

    if (!item) {
      return;
    }

    setTamanho(
      item.tamanho
    );

    setBase(
      item.base ||
      BASE_PADRAO
    );

    setComplementosSelecionados([
      ...item.complementos,
    ]);

    setQuantidade(
      item.quantidade
    );

    setItemEmEdicaoId(
      item.id
    );
  }

  function adicionarAoCarrinho(
    bomba = null
  ) {
    if (!tamanho || !base) {
      return;
    }

    const precoUnitario =
      tamanho.preco +
      complementosSelecionados.reduce(
        (
          soma,
          complemento
        ) =>
          soma +
          complemento.preco,
        0
      );

    if (itemEmEdicaoId) {
      setCarrinho(
        (atual) =>
          atual.map(
            (item) => {
              if (
                item.id !==
                itemEmEdicaoId
              ) {
                return item;
              }

              const nomeBaseProduto =
                bomba?.nome ||
                obterNomeBaseProduto(
                  item
                );

              return {
                ...item,

                nomeBaseProduto,

                nomeProduto:
                  `${nomeBaseProduto} • ${base.nome}`,

                tamanho,

                base,

                complementos: [
                  ...complementosSelecionados,
                ],

                quantidade,

                precoUnitario,
              };
            }
          )
      );

      limparMontagem();

      return;
    }

    const nomeBaseProduto =
      bomba?.nome ||
      "Açaí Bomba personalizado";

    const novoItem = {
      id:
        crypto.randomUUID(),

      nomeBaseProduto,

      nomeProduto:
        `${nomeBaseProduto} • ${base.nome}`,

      tamanho,

      base,

      complementos: [
        ...complementosSelecionados,
      ],

      quantidade,

      precoUnitario,
    };

    setCarrinho(
      (atual) => [
        ...atual,
        novoItem,
      ]
    );

    limparMontagem();
  }

  function removerDoCarrinho(
    id
  ) {
    setCarrinho(
      (atual) =>
        atual.filter(
          (item) =>
            item.id !== id
        )
    );
  }

  function alterarQuantidadeCarrinho(
    id,
    alteracao
  ) {
    setCarrinho(
      (atual) =>
        atual.map(
          (item) => {
            if (
              item.id !== id
            ) {
              return item;
            }

            const novaQuantidade =
              Math.min(
                10,
                Math.max(
                  1,
                  item.quantidade +
                    alteracao
                )
              );

            return {
              ...item,

              quantidade:
                novaQuantidade,
            };
          }
        )
    );
  }

  const value = {
    tamanho,
    setTamanho,

    base,
    setBase,

    complementosSelecionados,
    alternarComplemento,

    quantidade,
    setQuantidade,

    total,

    aplicarBomba,

    limparMontagem,

    itemEmEdicaoId,

    iniciarEdicaoCarrinho,

    carrinho,

    adicionarAoCarrinho,

    removerDoCarrinho,

    alterarQuantidadeCarrinho,

    totalCarrinho,

    quantidadeTotalCarrinho,
  };

  return (
    <PedidoContext.Provider
      value={value}
    >
      {children}
    </PedidoContext.Provider>
  );
}

export function usePedido() {
  const context =
    useContext(
      PedidoContext
    );

  if (!context) {
    throw new Error(
      "usePedido deve ser usado dentro de PedidoProvider"
    );
  }

  return context;
}