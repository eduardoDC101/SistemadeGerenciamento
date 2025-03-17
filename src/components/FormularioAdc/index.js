import React, { useState } from "react";
import "./formulariostyle.css";
import { toast } from "react-toastify";

export default function FormularioAdc({
  adcAtivado,
  setAdcAtivado,
  adicionarPedidos,
}) {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [produto, setProduto] = useState("Foto_P");
  const [formaEntrega, setFormaEntrega] = useState("Retirar");
  const [bairro, setBairro] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (nome.length < 3) {
      toast.warn("O Nome deve conter pelo menos 3 caracteres");
      return;
    }

    if (quantidade <= 0) {
      toast.warn("A Quantidade deve ser maior que 0");
      return;
    }

    if (formaEntrega === "Entrega" && bairro.length < 5) {
      toast.warn("O Bairro deve conter pelo menos 5 caracteres");
      return;
    }

    const novoPedido = {
      id: Date.now(),
      nome,
      quantidade,
      produto,
      formaEntrega,
      estado: "Pendente",
      data: new Date().toLocaleDateString("pt-BR"),
    };

    if (formaEntrega === "Entrega") {
      novoPedido.bairro = bairro;
    }

    adicionarPedidos(novoPedido);

    setNome("");
    setQuantidade(1);
    setProduto("Foto_P");
    setFormaEntrega("Retirar");
    setBairro("");

    setAdcAtivado(false);
  }

  return (
    <div>
      {adcAtivado && (
        <div className="divFundoForm">
          <h1>Dados do Cliente</h1>
          <form onSubmit={handleSubmit}>
            <div className="itensForm">
              <label htmlFor="nome">Nome: </label>
              <input
                type="text"
                placeholder="Nome..."
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="itensForm">
              <label htmlFor="quantidade">Quantidade: </label>
              <input
                type="number"
                id="quantidade"
                placeholder="Quantidade..."
                min="1"
                value={quantidade}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value);
                  if (newValue >= 1) {
                    setQuantidade(newValue);
                  }
                }}
                required
              />
            </div>
            <div className="itensForm">
              <label htmlFor="produto">Produto: </label>
              <select
                id="produto"
                value={produto}
                onChange={(e) => setProduto(e.target.value)}
                required
              >
                <option value="Foto_P">Foto P</option>
                <option value="Foto_M">Foto M</option>
                <option value="Foto_G">Foto G</option>
                <option value="Album">Álbum</option>
              </select>
            </div>
            <div className="itensForm">
              <label>Forma de Entrega: </label>
              <div className="radio">
                <input
                  type="radio"
                  id="retirar"
                  name="formaEntrega"
                  value="retirar"
                  checked={formaEntrega === "Retirar"}
                  onChange={() => setFormaEntrega("Retirar")}
                />
                <label htmlFor="retirar">Retirar</label>

                <input
                  type="radio"
                  id="entrega"
                  name="formaEntrega"
                  value="entrega"
                  checked={formaEntrega === "Entrega"}
                  onChange={() => setFormaEntrega("Entrega")}
                />
                <label htmlFor="entrega">Entregar</label>
              </div>
            </div>
            {formaEntrega === "Entrega" && (
              <div className="itensForm">
                <label htmlFor="bairro">Bairro: </label>
                <input
                  type="text"
                  id="bairro"
                  placeholder="Bairro..."
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  required={formaEntrega === "Entrega"}
                />
              </div>
            )}
            <button type="submit">Salvar Pedido</button>
            <button
              onClick={(e) => {
                if (
                  window.confirm(
                    "Tem certeza que deseja cancelar? Todos os dados serão perdidos."
                  )
                ) {
                  setAdcAtivado(false);
                }
              }}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
