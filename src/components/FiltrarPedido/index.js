import React from "react";
import "./stylefiltro.css";

export default function FiltrarPedido({ nome, setNome, filtro, setFiltro }) {
  return (
    <div className="fundoFiltro">
      <form>
        <div>
          <label>
            <span>Pesquisar:</span>
            <input
              id="nomeFiltro"
              name="nomeFiltro"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            <span>Filtrar:</span>
            <select
              id="estadoFitro"
              name="estadoFiltro"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            >
              <option value={""}>Todos</option>
              <option value={"Entregue"}>Entregues</option>
              <option value={"Pendente"}>Pendentes</option>
            </select>
          </label>
        </div>
      </form>
    </div>
  );
}
