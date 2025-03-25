import React from "react";
import { toast } from "react-toastify";
import "./styleBackup.css";

export default function BackUp({ pedidos, setPedidos }) {
  //Salvar Backup
  const salvarComoJSON = () => {
    if (pedidos.length === 0) {
      toast.error("Nenhum pedido para salvar!");
      return;
    }

    const jsonString = JSON.stringify(pedidos, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "backup_pedidos.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
    toast.success("Backup baixado com sucesso!");
  };

  //RestaurarBackup
  const restaurarBackup = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = (event) => {
      const file = event.target.files[0];

      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        try {
          const pedidosRestaurados = JSON.parse(reader.result);

          if (Array.isArray(pedidosRestaurados)) {
            setPedidos(pedidosRestaurados);
            localStorage.setItem("pedidos", JSON.stringify(pedidosRestaurados));
            toast.success("Backup restaurado com sucesso!");
          } else {
            toast.error("Formato de arquivo inválido!");
          }
        } catch (error) {
          toast.error("Erro ao restaurar o backup!");
        }
      };

      reader.readAsText(file);
    };

    input.click();
  };
  return (
    <section className="fundoBotoesBackup">
      <button className="botaoSalvar" onClick={salvarComoJSON}>
        Baixar Backup
      </button>
      <button className="botaoRestaurar" onClick={restaurarBackup}>
        Restaurar Backup
      </button>
    </section>
  );
}
