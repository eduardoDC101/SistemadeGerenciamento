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
    link.href = url; //1.4
    link.download = "Backup_Polaroigs.json"; //1.5

    document.body.appendChild(link); //1.6
    link.click(); //1.7
    document.body.removeChild(link); //1.8

    URL.revokeObjectURL(url); // 1.9
    toast.success("Backup baixado com sucesso!");
  };

  //RestaurarBackup
  const restaurarBackup = () => {
    const input = document.createElement("input"); //2.0
    input.type = "file"; //2.1
    input.accept = ".json"; //2.2

    //2.3
    input.onchange = (event) => {
      const file = event.target.files[0]; //2.4

      if (!file) return; //2.5

      const reader = new FileReader(); // 2.6

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

/* SALVAR BACKUP

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

1.4 = link.href = url;
Agora, definimos o endereço (href) do link, ou seja, a URL do arquivo. 
O url que você criamos anteriormente(do virtual blob) é atribuído ao href link.
Isso significa que, quando o usuário clicar nesse link, ele será redirecionado para o arquivo JSON que criamos

1.5 = link.download = "Backup_Polaroigs.json";
Aqui, definimos o nome que o arquivo deve ter quando baixado.
O atributo downloaddo link HTML permite definar o nome do arquivo.
Quando o usuário clicar no link, o arquivo será baixado com o nome "Backup_Polaroigs"

1.6 = document.body.appendChild(link); 
Essa linha adiciona o link dinamicamente no corpo da página. 
Isso é necessário porque, para que um link de download funcione, o elemento <a> precisa estar presente no DOM, mesmo que seja temporariamente.
O appendChild()adicione o link ao corpo do documento. 

1.7 = link.click(); 
Aqui, simulamps um clique no link. 
Essa linha faz o download do arquivo imediatamente, sem que o usuário precise clicar de fato no link.
O click()é um método do JavaScript que dispara o evento de clicar no link, ou que inicia o processo de download.

1.8 = document.body.removeChild(link);
Após o clique, removemos o link da página . 
Como o link foi usado apenas para iniciar o download, não faz sentido deixá-lo na página depois que ele já foi clicado.
O removeChild()é usado para remover o link do DOM, limpando a página.

1.9 = URL.revokeObjectURL(url);
Aqui, revogamos a URL temporária criada anteriormente.
Isso é feito para liberar a memória e garantir que o sistema não atualize referências desnecessárias a objetos antigos.
revokeObjectURL() remova a URL gerada pelo createObjectURL, o que ajuda a liberar recursos.
(quebramos o link de acesso ao blob)

(O download é mt rápido, por isso não vemos o Link, ele surge, é baixado e some e também , por que esse link é "invisível", ele não tem estilo, posição ou qualquer outra coisa que o faça aparecer na tela.)

*/

/* RESTAURAR BACKUP

2.0 = const input = document.createElement("input");     Cria um input e armazena ele em uma constante "input"
2.1 = input.type = "file";     Fala que o tipo desse input é file (aquele que seleciona um arquivo do PC)
2.2 = input.accept = ".json";  Fala que ese arquivo só pode ser do formato ".json"
Isso tudo seria: <input type="file" accept=".json" />

2.3 = input.onchange = (event) => {...}, tudo aqui dentro será executado quando uma change acontecer, no caso, tudo dentro de {}, vai rodar quando o usuário clicar e "enviar" o arquivo. (event é o arquivo).

2.4 = const file = event.target.files[0];,  o comando event.target.files[0];, pega o primeiro arquivo que o usuário selecionar (caso ele selecione vários). E armazena em file, que vamos usar. Logo a constante "file", possui nosso arquivo .json de backup.

2.5 = if (!file) return; Se o usuário tentar mandar sem selecionar um arquivo (file fica null ou vazio), o código para ali e não faz nada.

2.6 = 

*/
