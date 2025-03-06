import React from "react";
import { jsPDF } from "jspdf";
import "./botaostyle.css";

export default function BotoesCabecalhos({
  setAdcAtivado,
  numeroDePedidos,
  totalEmVendas,
  pedidos,
}) {
  /*____________________________________________________________________________________ */
  const emitirRelatorio = () => {
    // Filtrando os pedidos entregues
    const pedidosEntregues = pedidos.filter(
      (pedido) => pedido.estado === "Entregue"
    );

    // Criando o PDF
    const doc = new jsPDF();

    // Definindo fonte e tamanho
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);

    // Título do PDF em negrito
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Relatório de Pedidos Entregues", 20, 20);

    // Adicionando um espaço de uma linha abaixo do título
    let y = 40; // Posição vertical inicial para os dados

    // Adicionando os cabeçalhos das colunas
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Nome", 20, y);
    doc.text("Data", 100, y); // Ajustando a posição para alinhar corretamente
    doc.text("Valor", 150, y);
    y += 10; // Distância entre o cabeçalho e os dados

    // Definindo a fonte de volta para normal para os dados
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);

    // Adicionando os dados dos pedidos
    pedidosEntregues.forEach((pedido) => {
      const valorBruto = calcularValorTotal(pedido);

      // Alinhando o texto
      doc.text(pedido.nome, 20, y); // Nome alinhado à esquerda
      doc.text(pedido.data, 100, y); // Data alinhada no meio
      doc.text(
        valorBruto.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        150,
        y
      ); // Valor alinhado à direita

      y += 10; // Distância entre as linhas
    });

    // Adicionando o total de vendas após todos os pedidos
    const totalVendasTexto = `Total de Vendas: ${totalEmVendas.toLocaleString(
      "pt-BR",
      { style: "currency", currency: "BRL" }
    )}`;

    y += 10;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(totalVendasTexto, 20, y);

    // Salvando o arquivo PDF
    doc.save("Relatorio_Polaroigs.pdf");
  };

  // Função para calcular o valor total do pedido (simplificando para o valor bruto)
  const calcularValorTotal = (pedido) => {
    const quantidade = parseInt(pedido.quantidade, 10);
    const produtos = {
      Foto_P: { valorUnitario: 2 },
      Foto_M: { valorUnitario: 3 },
      Foto_G: { valorUnitario: 3.5 },
      Album: { valorUnitario: 250 },
    };

    const produtoSelecionado = produtos[pedido.produto];
    return produtoSelecionado
      ? quantidade * produtoSelecionado.valorUnitario
      : 0;
  };

  /*____________________________________________________________________________________ */

  return (
    <header className="cabecalhoHeader">
      <div className="cabecalhoValores">
        <span className="linhaValor">
          N. de Pedidos:
          <strong>
            <span className="valor">{numeroDePedidos}</span>
          </strong>
        </span>

        <span className="linhaValor">
          T. Vendas:
          <strong>
            <span className="valor">
              {totalEmVendas.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </strong>
        </span>
      </div>
      <button type="button" className="adc" onClick={() => setAdcAtivado(true)}>
        Adicionar Pedido
      </button>
      <button type="button" className="emr" onClick={emitirRelatorio}>
        Emitir Relatório
      </button>
    </header>
  );
}
