import React from "react";
import "./Cardstyle.css";

export default function PedidoCard({
  pedido,
  finalizarPedido,
  index,
  setPedidoSelecionado,
  apagarPedido,
}) {
  const abrirDetalhes = () => {
    setPedidoSelecionado(pedido);
  };

  return (
    <div className="pedidoCard" onClick={abrirDetalhes}>
      <div className="fundoTextoCard">
        <h3>{pedido.nome}</h3>
        <p>
          <strong>Data:</strong> {pedido.data}
        </p>
        <p>
          <strong>Estado:</strong>{" "}
          <span
            style={{
              color: pedido.estado === "Pendente" ? "orange" : "green",
              fontWeight: "bold",
            }}
          >
            {pedido.estado}
          </span>
        </p>
      </div>

      <div className="fundoBotoesCard">
        <button
          onClick={(e) => {
            e.stopPropagation();
            finalizarPedido(index);
          }}
        >
          {pedido.estado === "Pendente" ? "Finalizar" : "Reverter"}
        </button>

        <button
          className="excluir"
          onClick={(e) => {
            e.stopPropagation();
            apagarPedido(index);
          }}
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
}
