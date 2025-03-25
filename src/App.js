import React, { useEffect, useState, useMemo, useCallback } from "react";

import "./styles/styleApp.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BotoesCabecalhos from "./components/BotoesCabecalho";
import FormularioAdc from "./components/FormularioAdc";
import PedidoCard from "./components/PedidoCard";
import InformacoePedido from "./components/InformacoePedido";
import FiltrarPedido from "./components/FiltrarPedido";
import BackUp from "./components/BackUp";

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
    alert("Lembre-se de fazer BACKUP");
  }, []);

  //Calcular Valor e Número dos pedidos
  const numeroDePedidos = pedidos.length;
  const totalEmVendas = pedidos.reduce((total, pedido) => {
    const quantidade = parseInt(pedido.quantidade, 10);

    const produtos = {
      Polaroid_P: { Pacote_Mini: 16, Pacote_Big: 26, Unidade: 4 },
      Polaroid_M: { Pacote_Mini: 25, Pacote_Big: 35, Unidade: 4 },
      Tirinha_de_Polaroid: { Pacote_Mini: 20, Pacote_Big: 26, Unidade: 6 },
      Polaroid_com_Imã: { Pacote_Mini: 35, Pacote_Big: 65, Unidade: 4 },
      Quadro_Mosaico_A3: { Modelo_Unico: 60 },
      Quadro_Varal_A3: { Modelo_Unico: 60 },
      Porta_retrato_em_Vidro: { Modelo_Unico: 60 },
      Porta_retrato_Varal: { Modelo_Unico: 45 },
      Box_de_Memórias: { Box_Mini: 30, Box_Big: 42 },
      Fotolivro: {
        Horizontal_20: 180,
        Horizontal_40: 240,
        Vertical_20: 280,
        Vertical_40: 320,
      },
    };

    if (
      produtos[pedido.produto] &&
      produtos[pedido.produto][pedido.modeloProduto]
    ) {
      const valorProdutoModeloSelecionado =
        produtos[pedido.produto][pedido.modeloProduto];
      const valorBruto = quantidade * valorProdutoModeloSelecionado;
      return total + valorBruto;
    }

    return total;
  }, 0);

  //Adicionar Novo Pedido
  const adicionarPedidos = useCallback(
    (novoPedido) => {
      const novosPedidos = [novoPedido, ...pedidos];
      setPedidos(novosPedidos);

      //Salvar no LocalStorage
      localStorage.setItem("pedidos", JSON.stringify(novosPedidos));
      toast.success("Pedido Adicionado");
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
      toast.error("Pedido Excluído");
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

  /*Função para atualizar o pedido no localStorage */
  const atualizarPedidoNoLocalStorage = (pedidoAtualizado) => {
    const novosPedidos = pedidos.map((pedido) =>
      pedido.id === pedidoAtualizado.id ? pedidoAtualizado : pedido
    );

    setPedidos(novosPedidos);

    localStorage.setItem("pedidos", JSON.stringify(novosPedidos));
    toast.success("Custo Extra adicionado com sucesso");
  };

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
        <BackUp pedidos={pedidos} setPedidos={setPedidos} />
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
            atualizarPedidoNoLocalStorage={atualizarPedidoNoLocalStorage}
          />
        )}
      </main>
    </div>
  );
}
