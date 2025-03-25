import React, { useState } from "react";
import { toast } from "react-toastify";
import "./infostyle.css";

export default function InformacoePedido({
  pedidoSelecionado,
  setPedidoSelecionado,
  atualizarPedidoNoLocalStorage,
}) {
  const fecharDetalhes = () => {
    setPedidoSelecionado(null);
  };
  const [teste, setTeste] = useState("");

  const quantidade = parseInt(pedidoSelecionado.quantidade, 10);

  const produtos = {
    Polaroid_P: {
      Pacote_Mini: 16,
      Pacote_Big: 26,
      Unidade: 4,
      custoUnitario: 0,
    },
    Polaroid_M: {
      Pacote_Mini: 25,
      Pacote_Big: 35,
      Unidade: 4,
      custoUnitario: 0,
    },
    Tirinha_de_Polaroid: {
      Pacote_Mini: 20,
      Pacote_Big: 26,
      Unidade: 6,
      custoUnitario: 0,
    },
    Polaroid_com_Imã: {
      Pacote_Mini: 35,
      Pacote_Big: 65,
      Unidade: 4,
      custoUnitario: 0,
    },
    Quadro_Mosaico_A3: { Modelo_Unico: 60, custoUnitario: 0 },
    Quadro_Varal_A3: { Modelo_Unico: 60, custoUnitario: 0 },
    Porta_retrato_em_Vidro: { Modelo_Unico: 60, custoUnitario: 0 },
    Porta_retrato_Varal: { Modelo_Unico: 45, custoUnitario: 0 },
    Box_de_Memórias: { Box_Mini: 30, Box_Big: 42, custoUnitario: 0 },
    Fotolivro: {
      Horizontal_20: 180,
      Horizontal_40: 240,
      Vertical_20: 280,
      Vertical_40: 320,
      custoUnitario: 0,
    },
  };

  const produtoSelecionado = produtos[pedidoSelecionado.produto];
  const valorProdutoModeloSelecionado = produtoSelecionado
    ? produtoSelecionado[pedidoSelecionado.modeloProduto]
    : null;

  let valorBruto = 0;
  let valorCustos = 0;
  let valorLiquido = 0;

  if (
    produtoSelecionado &&
    valorProdutoModeloSelecionado &&
    !isNaN(quantidade)
  ) {
    valorBruto = quantidade * valorProdutoModeloSelecionado;
    valorCustos = quantidade * produtoSelecionado.custoUnitario;
    valorLiquido = valorBruto - valorCustos;
  }

  const formatarMoeda = (valor) => {
    if (valor != null && !isNaN(valor)) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
    return "Valor inválido"; // Retorna um valor padrão caso o valor seja inválido
  };

  const StringProduto = pedidoSelecionado.produto;
  const StringModelo = pedidoSelecionado.modeloProduto;

  function handleSubmit(e) {
    e.preventDefault();

    const valorExtraConvertido = parseFloat(e.target.custoExtra.value);
    if (isNaN(valorExtraConvertido)) {
      toast.warn("Valor digitado não é um número");
      return;
    }

    const pedidoComCustoExtra = {
      ...pedidoSelecionado,
      custosExtras: valorExtraConvertido,
    };

    atualizarPedidoNoLocalStorage(pedidoComCustoExtra);

    setPedidoSelecionado(pedidoComCustoExtra);
  }

  return (
    <div className="InformacoePedido">
      <h1>Detalhes do Pedido</h1>
      <div className="fundoInfor">
        <p>
          <strong>Nome:</strong> {pedidoSelecionado.nome}
        </p>
        <p>
          <strong>Produto:</strong> {StringProduto.replace(/_/g, " ")}
        </p>
        {pedidoSelecionado.modeloProduto !== "Modelo_Unico" ? (
          <p>
            <strong>Modelo:</strong> {StringModelo.replace(/_/g, " ")}
          </p>
        ) : null}
        <p>
          <strong>Quantidade:</strong> {pedidoSelecionado.quantidade}
        </p>
        <p>
          <strong>Forma de Entrega:</strong> {pedidoSelecionado.formaEntrega}
        </p>
        {pedidoSelecionado.formaEntrega === "Entrega" && (
          <p>
            <strong>Bairro:</strong> {pedidoSelecionado.bairro}
          </p>
        )}
        <p>
          <strong>Data:</strong> {pedidoSelecionado.data}
        </p>

        <form id="formInformacoes" onSubmit={handleSubmit}>
          <label htmlFor="custoExtra">C. Extras:</label>
          <div className="fundoCustoExtra">
            <input
              type="text"
              placeholder="Digite os custos extras..."
              id="custoExtra"
              min="0.1"
              value={teste}
              onChange={(e) => setTeste(e.target.value)}
            />
            <button className="btnAdc" type="submit">
              +
            </button>
          </div>
        </form>
        <p className="custosExtras">
          Custo Extra:{" "}
          {pedidoSelecionado.custosExtras == null ||
          pedidoSelecionado.custosExtras === ""
            ? "Sem custos..."
            : formatarMoeda(pedidoSelecionado.custosExtras)}
        </p>
        <div className="ValoresCard">
          <p>
            <strong>Custos: </strong>
            <span className="custos">{formatarMoeda(valorCustos)}</span>
          </p>
          <p>
            <strong>Lucro: </strong>
            <span className="lucro">{formatarMoeda(valorLiquido)}</span>
          </p>
          <p className="ultimoP">
            <strong>Total: </strong>
            <span className="total">{formatarMoeda(valorBruto)}</span>
          </p>
        </div>
      </div>
      <button onClick={fecharDetalhes}>Fechar</button>
    </div>
  );
}
