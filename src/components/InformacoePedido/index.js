import React from "react";
import "./infostyle.css";

export default function InformacoePedido({
  pedidoSelecionado,
  setPedidoSelecionado,
}) {
  const fecharDetalhes = () => {
    setPedidoSelecionado(null);
  };

  const quantidade = parseInt(pedidoSelecionado.quantidade, 10);

  const produtos = {
    /*Foto_P: { valorUnitario: 2, custoUnitario: 0.5 },
    Foto_M: { valorUnitario: 3, custoUnitario: 0.75 },
    Foto_G: { valorUnitario: 3.5, custoUnitario: 1 },
    Album: { valorUnitario: 250, custoUnitario: 115 },*/
    Polaroid_P: { valorUnitario: 16 }, //3
    Polaroid_M: { valorUnitario: 25 }, //3
    Tirinha_de_Polaroid: { valorUnitario: 20 }, //3
    Polaroid_com_Imã: { valorUnitario: 35 }, //3
    Quadro_Mosaico_A3: { valorUnitario: 60 },
    Quadro_Varal_A3: { valorUnitario: 60 },
    Porta_retrato_em_Vidro: { valorUnitario: 60 },
    Porta_retrato_Varal: { valorUnitario: 45 },
    Box_de_Memórias: { valorUnitario: 30 }, //2
    Fotolivro: { valorUnitario: 180 }, //4
  };

  const produtoSelecionado = produtos[pedidoSelecionado.produto];

  const valorBruto = produtoSelecionado
    ? quantidade * produtoSelecionado.valorUnitario
    : 0;
  const valorCustos = produtoSelecionado
    ? quantidade * produtoSelecionado.custoUnitario
    : 0;
  const valorLiquido = valorBruto - valorCustos;

  const formatarMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const StringProduto = pedidoSelecionado.produto;

  return (
    <div className="InformacoePedido">
      <h1>Detalhes do Pedido</h1>
      <div className="fundoInfor">
        <p>
          <strong>Nome:</strong> {pedidoSelecionado.nome}
        </p>
        <p>
          <strong>Quantidade:</strong> {pedidoSelecionado.quantidade}
        </p>
        <p>
          <strong>Produto:</strong> {StringProduto.replace(/_/g, " ")}
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
        <p>
          <strong>Estado:</strong> {pedidoSelecionado.estado}
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
