import React, { useEffect, useState, useMemo, useCallback } from "react";
import "./styles/styleApp.css";
import BotoesCabecalhos from "./components/BotoesCabecalho";
import FormularioAdc from "./components/FormularioAdc";
import PedidoCard from "./components/PedidoCard";
import InformacoePedido from "./components/InformacoePedido";
import FiltrarPedido from "./components/FiltrarPedido";

export default function App() {
  const [adcAtivado, setAdcAtivado] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  //States de Filtro:
  const [filtro, setFiltro] = useState("");
  const [nome, setNome] = useState("");

  //Carregar Pedidos do LocalStorage
  useEffect(() => {
    const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos")) || [];
    setPedidos(pedidosSalvos);
  }, []);

  //Calcular Valor e Número dos pedidos
  const numeroDePedidos = pedidos.length;
  const totalEmVendas = pedidos.reduce((total, pedido) => {
    const quantidade = parseInt(pedido.quantidade, 10);
    const produtos = {
      Foto_P: { valorUnitario: 2 },
      Foto_M: { valorUnitario: 3 },
      Foto_G: { valorUnitario: 3.5 },
      Album: { valorUnitario: 250 },
    };

    const produtoSelecionado = produtos[pedido.produto];
    const valorBruto = produtoSelecionado
      ? quantidade * produtoSelecionado.valorUnitario
      : 0;
    return total + valorBruto;
  }, 0);

  //Adicionar Novo Pedido
  const adicionarPedidos = useCallback(
    (novoPedido) => {
      const novosPedidos = [novoPedido, ...pedidos];
      setPedidos(novosPedidos);

      //Salvar no LocalStorage
      localStorage.setItem("pedidos", JSON.stringify(novosPedidos));
    },
    [pedidos]
  );

  //Alterar Estado do Pedido
  const finalizarPedido = useCallback(
    (index) => {
      const novosPedidos = [...pedidos];
      novosPedidos[index].estado =
        novosPedidos[index].estado === "Pendente" ? "Entregue" : "Pendente";
      setPedidos(novosPedidos);
      localStorage.setItem("pedidos", JSON.stringify(novosPedidos));
    },
    [pedidos]
  );

  /*Apagar Pedido*/
  const apagarPedido = useCallback(
    (index) => {
      const novosPedidos = pedidos.filter((pedido, i) => i !== index);
      setPedidos(novosPedidos);
      localStorage.setItem("pedidos", JSON.stringify(novosPedidos));
    },
    [pedidos]
  );

  /*Filtrar Pedido*/
  const filtroPedidos = useMemo(() => {
    return pedidos.filter((pedido) => {
      return (
        (filtro === "" || pedido.estado === filtro) &&
        (nome === "" || pedido.nome.toLowerCase().includes(nome.toLowerCase()))
      );
    });
  }, [pedidos, filtro, nome]);

  return (
    <div className="fundoPrincipal">
      <BotoesCabecalhos
        setAdcAtivado={setAdcAtivado}
        numeroDePedidos={numeroDePedidos}
        totalEmVendas={totalEmVendas}
        pedidos={pedidos}
      />
      <main>
        <FormularioAdc
          adcAtivado={adcAtivado}
          setAdcAtivado={setAdcAtivado}
          adicionarPedidos={adicionarPedidos}
        />

        {pedidos.length > 0 ? (
          <FiltrarPedido
            nome={nome}
            setNome={setNome}
            filtro={filtro}
            setFiltro={setFiltro}
          />
        ) : (
          console.log("")
        )}

        {filtroPedidos.length > 0 ? (
          filtroPedidos.map((pedido, index) => (
            <PedidoCard
              key={pedido.id}
              pedido={pedido}
              finalizarPedido={finalizarPedido}
              index={index}
              setPedidoSelecionado={setPedidoSelecionado}
              apagarPedido={apagarPedido}
            />
          ))
        ) : (
          <p className="SemPedido">Sem pedidos ainda...</p>
        )}

        {pedidoSelecionado && (
          <InformacoePedido
            pedidoSelecionado={pedidoSelecionado}
            setPedidoSelecionado={setPedidoSelecionado}
          />
        )}
      </main>
    </div>
  );
}
