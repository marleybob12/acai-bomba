import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const PedidoContext = createContext();

export function PedidoProvider({ children }) {
  const [tamanho, setTamanho] = useState(null);

  const [
    complementosSelecionados,
    setComplementosSelecionados,
  ] = useState([]);

  const [quantidade, setQuantidade] = useState(1);

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

  function alternarComplemento(complemento) {
    const jaSelecionado =
      complementosSelecionados.some(
        (item) =>
          item.id === complemento.id
      );

    if (jaSelecionado) {
      setComplementosSelecionados(
        complementosSelecionados.filter(
          (item) =>
            item.id !== complemento.id
        )
      );

      return;
    }

    setComplementosSelecionados([
      ...complementosSelecionados,
      complemento,
    ]);
  }

  const value = {
    tamanho,
    setTamanho,

    complementosSelecionados,
    alternarComplemento,

    quantidade,
    setQuantidade,

    total,
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