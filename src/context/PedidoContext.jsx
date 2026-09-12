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

    return Array.isArray(dados)
      ? dados
      : [];
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
    complementosSelecionados,
    setComplementosSelecionados,
  ] = useState([]);

  const [
    quantidade,
    setQuantidade,
  ] = useState(1);

  /*
    Agora o carrinho tenta carregar
    os itens salvos no navegador.
  */
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

  /*
    Sempre que o carrinho mudar,
    salva automaticamente.
  */
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

    setComplementosSelecionados(
      complementosDaBomba
    );

    setQuantidade(1);
  }

  function limparMontagem() {
    setTamanho(null);

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
    if (!tamanho) {
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

    /*
      Se veio de uma Bomba da Casa,
      usamos o nome da bomba.

      Caso contrário, é uma montagem
      personalizada.
    */
    const nomeProduto =
      bomba?.nome || null;

    /*
      EDIÇÃO
    */
    if (itemEmEdicaoId) {
      setCarrinho(
        (atual) =>
          atual.map(
            (item) =>
              item.id ===
              itemEmEdicaoId
                ? {
                    ...item,

                    tamanho,

                    complementos: [
                      ...complementosSelecionados,
                    ],

                    quantidade,

                    precoUnitario,

                    /*
                      Se estiver editando uma
                      Bomba da Casa, mantém
                      o nome original.
                    */
                    nomeProduto:
                      nomeProduto ||
                      item.nomeProduto ||
                      "Açaí Bomba personalizado",
                  }
                : item
          )
      );

      limparMontagem();

      return;
    }

    /*
      NOVO ITEM
    */
    const novoItem = {
      id:
        crypto.randomUUID(),

      nomeProduto:
        nomeProduto ||
        "Açaí Bomba personalizado",

      tamanho,

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