import React, { useState, useEffect } from "react";
import "./formulariostyle.css";
import { toast } from "react-toastify";

export default function FormularioAdc({
  adcAtivado,
  setAdcAtivado,
  adicionarPedidos,
}) {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [produto, setProduto] = useState("Polaroid_P");
  const [formaEntrega, setFormaEntrega] = useState("");
  const [bairro, setBairro] = useState("");

  const [modeloProduto, setModeloProduto] = useState("Pacote_Mini");
  const [verificaModelos, setVerificaModelos] = useState(false);

  useEffect(() => {
    if (
      produto === "Quadro_Mosaico_A3" ||
      produto === "Quadro_Varal_A3" ||
      produto === "Porta_retrato_em_Vidro" ||
      produto === "Porta_retrato_Varal"
    ) {
      setModeloProduto("Modelo_Unico");
    } else if (
      produto === "Polaroid_P" ||
      produto === "Polaroid_M" ||
      produto === "Polaroid_com_Imã" ||
      produto === "Tirinha_de_Polaroid"
    ) {
      setModeloProduto("Pacote_Mini");
      setVerificaModelos(true);
    } else if (produto === "Box_de_Memórias") {
      setModeloProduto("Box_Mini");
      setVerificaModelos(true);
    } else if (produto === "Fotolivro") {
      setModeloProduto("Horizontal_20");
      setVerificaModelos(true);
    }
  }, [produto]);

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
      modeloProduto,
    };

    if (formaEntrega === "Entrega") {
      novoPedido.bairro = bairro;
    }

    adicionarPedidos(novoPedido);

    setNome("");
    setQuantidade("");
    setProduto("Polaroid_P");
    setFormaEntrega("Retirar");
    setBairro("");
    setModeloProduto("");

    setAdcAtivado(false);
  }

  const verificaProduto = (nomeProduto) => {
    if (
      nomeProduto === "Polaroid_P" ||
      nomeProduto === "Polaroid_M" ||
      nomeProduto === "Polaroid_com_Imã"
    ) {
      return (
        <div className="itensForm">
          <label htmlFor="modeloProduto">Modelo: </label>
          <select
            id="modeloProduto"
            value={modeloProduto}
            onChange={(e) => setModeloProduto(e.target.value)}
            required
          >
            <option value="Pacote_Mini">Pacote Mini (10 fotos)</option>
            <option value="Pacote_Big">Pacote Big (20 fotos)</option>
            <option value="Unidade">Unidade</option>
          </select>
        </div>
      );
    }
    if (nomeProduto === "Tirinha_de_Polaroid") {
      return (
        <div className="itensForm">
          <label htmlFor="modeloProduto">Modelo: </label>
          <select
            id="modeloProduto"
            value={modeloProduto}
            onChange={(e) => setModeloProduto(e.target.value)}
            required
          >
            <option value="Pacote_Mini">Pacote Mini (4 tirinhas)</option>
            <option value="Pacote_Big">Pacote Big (6 tirinhas)</option>
            <option value="Unidade">Unidade</option>
          </select>
        </div>
      );
    }
    if (nomeProduto === "Box_de_Memórias") {
      return (
        <div className="itensForm">
          <label htmlFor="modeloProduto">Modelo: </label>
          <select
            id="modeloProduto"
            value={modeloProduto}
            onChange={(e) => setModeloProduto(e.target.value)}
            required
          >
            <option value="Box_Mini">Box Mini (10 fotos)</option>
            <option value="Box_Big">Box Big (20 fotinhas)</option>
          </select>
        </div>
      );
    }
    if (nomeProduto === "Fotolivro") {
      return (
        <div className="itensForm">
          <label htmlFor="modeloProduto">Modelo: </label>
          <select
            id="modeloProduto"
            value={modeloProduto}
            onChange={(e) => setModeloProduto(e.target.value)}
            required
          >
            <option value="Horizontal_20">Horizontal (20 fotos)</option>
            <option value="Horizontal_40">Horizontal (40 fotinhas)</option>
            <option value="Vertical_20">Vertical (20 fotos)</option>
            <option value="Vertical_40">Vertical (40 fotinhas)</option>
          </select>
        </div>
      );
    }
    return null;
  };

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
              <label htmlFor="produto">Produto: </label>
              <select
                id="produto"
                value={produto}
                onChange={(e) => setProduto(e.target.value)}
                required
              >
                <option value="Polaroid_P">Polaroid P</option>
                <option value="Polaroid_M">Polaroid M</option>
                <option value="Tirinha_de_Polaroid">Tirinha de Polaroid</option>
                <option value="Polaroid_com_Imã">Polaroid com Imã</option>
                <option value="Quadro_Mosaico_A3">Quadro Mosaico A3</option>
                <option value="Quadro_Varal_A3">Quadro Varal A3</option>
                <option value="Porta_retrato_em_Vidro">
                  Porta-retrato em Vidro
                </option>
                <option value="Porta_retrato_Varal">Porta-retrato Varal</option>
                <option value="Box_de_Memórias">Box de Memórias</option>
                <option value="Fotolivro">Fotolivro</option>
              </select>
            </div>
            {verificaModelos && verificaProduto(produto)}
            <div className="itensForm">
              <label htmlFor="quantidade">Quantidade: </label>
              <input
                type="number"
                id="quantidade"
                placeholder="Quantidade..."
                min="1"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                required
              />
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
              type="button"
              onClick={(e) => {
                if (
                  window.confirm(
                    "Tem certeza que deseja cancelar? Todos os dados serão perdidos."
                  )
                ) {
                  setNome("");
                  setQuantidade("");
                  setProduto("Polaroid_P");
                  setFormaEntrega("Retirar");
                  setBairro("");
                  setModeloProduto("");
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
