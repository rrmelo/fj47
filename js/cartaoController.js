const cartaoController = (function(){

   

let contador = $(".cartao").length;

//----------------------------------------------------------

function removeCartao() {

    const id = this.dataset.ref;
    const cartao = document.querySelector("#cartao_" + id); /* ou (`#cartao_${id}`) template string */
    cartao.classList.add("cartao--some");

    /*
    setTimeout(function(){
       cartao.remove();
    },400);
   
    ou em arrow function escopo estatico, nao da pra usar o this por exemplo
    */

    setTimeout(() => {
        cartao.remove();
        $(document).trigger("precisaSincronizar");
    }, 500);
}



//-----------------------------------------------------------------





function decideTipoCartao(texto) {

    let quebras = texto.split("<br>").length;

    let totalDeLetras = texto.replace(/<br>/g, " ").length;

    let ultimoMaior = "";

    texto
        .replace(/<br>/g, " ")
        .split(" ")
        .forEach(function (palavra) {
            if (palavra.length > ultimoMaior.length) {
                ultimoMaior = palavra;
            }
        });

    let tamMaior = ultimoMaior.length;

    let tipoCartao = "cartao--textoPequeno";

    if (tamMaior < 9 && quebras < 5 && totalDeLetras < 55) {
        tipoCartao = "cartao--textoGrande";
    } else if (tamMaior < 12 && quebras < 6 && totalDeLetras < 75) {
        tipoCartao = "cartao--textoMedio";
    }

    return tipoCartao;
}


//-------------------------------------------------------------






function adicionaCartao(texto, cor) {

    contador++;

    // cria o botao remover
    const botao = $("<button>")
            .addClass("opcoesDoCartao-remove")
            .text("remover")
            .click(removeCartao)
            .attr("data-ref", contador);

    // cria o p do texto do form
    const paragrafo = $("<p>")
            .on("input", editaCartao)
            .on("paste", event=>event.preventDefault())
            .attr("contenteditable", true)
            .addClass("cartao-conteudo")
            .html(texto); // pode ser o html ou append ai

    // cria a div do botão
    const opcoesDoCartao = $("<div>")
            .addClass("opcoesDoCartao")
            .append(botao);

    //recebe o tipo do cartão e add na div abaixo
    const tipoCartao = decideTipoCartao(texto);

    // cria div do cartão
    const cartao = $("<div>")
            .addClass("cartao")
            .css("background", cor)
            .addClass(tipoCartao)
            .attr("id", `cartao_${contador}`);

    // coloca o botao no inicio do mural, se for append sai no final 
    cartao.append(opcoesDoCartao)
        .append(paragrafo)
        .prependTo(".mural");

}


var timer = 0;
function editaCartao() {

    const paragrafo = $(this);

    clearTimeout(timer);
    timer = setTimeout(function(){

        $(document).trigger("precisaSincronizar");

        const tipo = decideTipoCartao(paragrafo.html());
        paragrafo.closest(".cartao")
        .removeClass("texto--cartaoPequeno texto--cartaoMedio texto--cartaoGrande")
        .addClass(tipo);
        
    },500);
}

 // teste console.log(timer);

const botoes = document.querySelectorAll(".opcoesDoCartao-remove");

for (butao of botoes) {
    butao.addEventListener("click", removeCartao);
}

return {removeCartao, adicionaCartao};

})();
