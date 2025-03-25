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

    const jsonString = JSON.stringify(pedidos, null, 2); // 1.0
    const blob = new Blob([jsonString], { type: "application/json" }); //1.1
    const url = URL.createObjectURL(blob); // 1.2

    const link = document.createElement("a"); // 1.3
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

/*

1.0 = const jsonString = JSON.stringify(pedidos, null, 2);
Aqui Convertemos um array/objeto para uma String JSON.
JSON.stringify(), pega um objeto JS, no caso, pedidos e trasnforma em uma string no formato JSON.
No comando "JSON.stringify()", o segundo parametro é a função de replacer, isso é, uma função que executaria sobre cada item do array pedidos enquanto ele estivesse sendo transformado em String JSON, no nosso caso, usamos null, ou seja, não alteramos os dados de 'pedido" em nada.
O terceiro parâmetro ( 2) é um valor de indentação que torna o JSON mais legível. Ele define que haja um recuo de 2 espaços em branco, facilitando a leitura do arquivo gerado.

1.1 = const blob = new Blob([jsonString], { type: "application/json" });
Aqui criamos um BLob, que é um arquivo de memória, a função Blob permite criar arquivos binários a partir de dados.
Estamos passando para Blob, [jsonString], que é nosso array(por isso as []) com os valores de pedido em String JSON.
{ type: "application/json" }, é um objeto onde você define o tipo do arquivo. No caso, você está dizendo que o tipo do arquivo será application/json, o que indica que é um arquivo JSON.
Ou seja, nosso const blob armazena um "arquivo virtual" contendo o JSON dos pedidos.

1.2 = const url = URL.createObjectURL(blob); 
Esta linha cria uma URL temporária para o blob que criamos, 
essa URL é um link que aponta para o "arquivo virtual" criamos na memória. 
Essa URL pode ser usada para baixar o arquivo ou exibi-lo.
URL.createObjectURL(blob), gera uma URL que pode ser usada como se fosse o endereço de um arquivo real.

1.3 = const link = document.createElement("a");
Aqui criamos um elemento <a> HTML programaticamente
Este <a> é o elemento de link que normalmente usamos em páginas da web para criar links clicáveis.
document.createElement("a") cria esse link "invisível", que vamps configurar para fazer o download do arquivo.

*/
