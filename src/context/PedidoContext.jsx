import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const PedidoContext = createContext(null);

export function PedidoProvider({ children }) {
  const [tamanho, setTamanho] = useState(null);

  const [
    complementosSelecionados,
    setComplementosSelecionados,
  ] = useState([]);

  const [quantidade, setQuantidade] = useState(1);

  const [carrinho, setCarrinho] = useState([]);

  const total = useMemo(() => {
    if (!tamanho) {
      return 0;
    }

    const valorComplementos =
      complementosSelecionados.reduce(
        (soma, complemento) =>
          soma + complemento.preco,
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

  const totalCarrinho = useMemo(() => {
    return carrinho.reduce(
      (totalAtual, item) =>
        totalAtual +
        item.precoUnitario *
        item.quantidade,
      0
    );
  }, [carrinho]);

  function alternarComplemento(complemento) {
    setComplementosSelecionados(
      (atuais) => {
        const jaSelecionado =
          atuais.some(
            (item) =>
              item.id === complemento.id
          );

        if (jaSelecionado) {
          return atuais.filter(
            (item) =>
              item.id !== complemento.id
          );
        }

        return [
          ...atuais,
          complemento,
        ];
      }
    );
  }

  function limparMontagem() {
    setTamanho(null);

    setComplementosSelecionados([]);

    setQuantidade(1);
  }

  function adicionarAoCarrinho() {
    if (!tamanho) {
      return;
    }

    const precoUnitario =
      tamanho.preco +
      complementosSelecionados.reduce(
        (soma, complemento) =>
          soma + complemento.preco,
        0
      );

    const novoItem = {
      id: crypto.randomUUID(),

      tamanho,

      complementos: [
        ...complementosSelecionados,
      ],

      quantidade,

      precoUnitario,
    };

    setCarrinho((atual) => [
      ...atual,
      novoItem,
    ]);

    limparMontagem();
  }

  function removerDoCarrinho(id) {
    setCarrinho((atual) =>
      atual.filter(
        (item) => item.id !== id
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

    carrinho,
    adicionarAoCarrinho,
    removerDoCarrinho,
    totalCarrinho,
    limparMontagem,
  };

  return (
    <PedidoContext.Provider value={value}>
      {children}
    </PedidoContext.Provider>
  );
}

export function usePedido() {
  const context = useContext(PedidoContext);

  if (!context) {
    throw new Error(
      "usePedido deve ser usado dentro de PedidoProvider"
    );
  }

  return context;
}