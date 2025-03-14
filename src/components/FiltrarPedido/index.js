import React, { useCallback } from "react";
import "./stylefiltro.css";

export default function FiltrarPedido({
  nome,
  setNome,
  filtro,
  setFiltro,
  mes,
  setMes,
}) {
  /*const limparFiltro = () => {
    setFiltro("");
    setMes("");
    setNome("");
  };*/

  const limparFiltro = useCallback(
    (e) => {
      e.preventDefault(); // Previne o envio do formulário
      setFiltro("");
      setMes("");
      setNome("");
    },
    [setNome, setFiltro, setMes]
  );

  return (
    <div className="fundoFiltro">
      <form>
        <div>
          <label>
            <span>Nome do Cliente:</span>
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
            <span>Estado:</span>
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

        <div>
          <label>
            <span>Mês:</span>
            <select
              id="estadoMes"
              name="estadoMes"
              value={mes}
              onChange={(e) => setMes(e.target.value)}
            >
              <option value={""}>Atual</option>
              <option value={"01"}>Janeiro</option>
              <option value={"02"}>Fevereiro</option>
              <option value={"03"}>Março</option>
              <option value={"04"}>Abril</option>
              <option value={"05"}>Maio</option>
              <option value={"06"}>Junho</option>
              <option value={"07"}>Julho</option>
              <option value={"08"}>Agosto</option>
              <option value={"09"}>Setembro</option>
              <option value={"10"}>Outubro</option>
              <option value={"11"}>Novembro</option>
              <option value={"12"}>Dezembro</option>
            </select>
          </label>
        </div>
        <div id="fundolimpar">
          <button id="limpar" onClick={limparFiltro}>
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
}
