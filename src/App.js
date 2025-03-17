import React, { useEffect, useState, useMemo, useCallback } from "react";

import "./styles/styleApp.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [mes, setMes] = useState("");

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
      Polaroid_P: { valorUnitario: 16 },
      Polaroid_M: { valorUnitario: 25 },
      Tirinha_de_Polaroid: { valorUnitario: 20 },
      Polaroid_com_Imã: { valorUnitario: 35 },
      Quadro_Mosaico_A3: { valorUnitario: 60 },
      Quadro_Varal_A3: { valorUnitario: 60 },
      Porta_retrato_em_Vidro: { valorUnitario: 60 },
      Porta_retrato_Varal: { valorUnitario: 45 },
      Box_de_Memórias: { valorUnitario: 30 },
      Fotolivro: { valorUnitario: 180 },
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
        (nome === "" ||
          pedido.nome.toLowerCase().includes(nome.toLowerCase())) &&
        (mes === "" || pedido.data.split("/")[1] === mes)
      );
    });
  }, [pedidos, filtro, nome, mes]);

  return (
    <div className="fundoPrincipal">
      <ToastContainer autoClose={2200} />
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
            mes={mes}
            setMes={setMes}
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
