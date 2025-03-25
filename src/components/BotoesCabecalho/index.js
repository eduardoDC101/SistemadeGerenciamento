import React from "react";
import { jsPDF } from "jspdf"; //Usada para criar e manipular pdfs
import "./botaostyle.css";
import { toast } from "react-toastify";

export default function BotoesCabecalhos({
  setAdcAtivado,
  numeroDePedidos,
  totalEmVendas,
  pedidos,
}) {
  const emitirRelatorio = () => {
    // Filtrando os pedidos entregues, todo pedido com estado entregue, é armazenado em pedidosEntregues
    const pedidosEntregues = pedidos.filter(
      (pedido) => pedido.estado === "Entregue"
    );

    // Calcular o total de vendas das entregues
    const totalVendasEntregues = pedidosEntregues.reduce((total, pedido) => {
      const valorBruto = calcularValorTotal(pedido);
      return total + valorBruto;
    }, 0); // total começa com 0

    // Criando o PDF
    const doc = new jsPDF();

    /* .set Define fonte e tamanho
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);*/

    // Título do PDF em negrito
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Relatório de Pedidos Entregues", 20, 20); // .text insere algo no doc, 20px a direita(x) e 20px pra baixo(y)

    // Adicionando um espaço de uma linha abaixo do título
    let y = 40; // Posição vertical inicial para os dados

    // Adicionando os cabeçalhos das colunas e redefinindo as fonts
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Nome", 20, y); // Ajustando a posição para alinhar corretamente, mesma linha (y) distancias diferentes(x)
    doc.text("Produto", 75, y);
    doc.text("Data", 135, y);
    doc.text("Valor", 170, y);
    y += 10; // Distância entre o cabeçalho e os dados

    // Definindo a fonte de volta para normal para os dados
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Adicionando os dados dos pedidos
    pedidosEntregues.forEach((pedido) => {
      const valorBruto = calcularValorTotal(pedido);

      // verifica se está perto de acabar a página para criar outra np pdf
      if (y > 270) {
        // se a altura(y) for maior que 270(290 geralmente o tamanho da tela)
        doc.addPage(); // vamos adicionar uma nova página no pdf
        y = 20; // vamos resetar a altura, para podermos usar "certo" para alinhar
      }

      // Alinhando o texto
      doc.text(pedido.nome, 20, y); // Nome alinhado à esquerda
      doc.text(pedido.produto, 75, y);
      doc.text(pedido.data, 135, y); // Data alinhada no meio
      doc.text(
        valorBruto.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        170,
        y
      ); // Valor alinhado à direita

      y += 10; // Distância entre as linhas
    });

    // Adicionando o total de vendas após todos os pedidos
    const totalVendasTexto = `Total de Vendas: ${totalVendasEntregues.toLocaleString(
      "pt-BR",
      { style: "currency", currency: "BRL" }
    )}`;

    y += 10;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(totalVendasTexto, 20, y);

    // Salvando o arquivo PDF
    doc.save("Relatorio_Polaroigs.pdf");
    toast.success("Relatório Emitido");
  };

  // Função para calcular o valor total do pedido
  const calcularValorTotal = (pedido) => {
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
      return valorBruto;
    }
  };

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
