(function(ctr){

    "use strict";

$(".novoCartao").submit(function (event) {  // callback com função anonima 

    event.preventDefault();   //o event ali sabe tudo e esse prevent cancela o refresh da pagina

    // console.log("kd?");  teste 

    const campoTexto = $(".novoCartao-conteudo"); //pega o texto do form

    const texto = campoTexto.val().trim().replace(/\n/g, "<br>"); //trim tira o vazio antes e depois do texto, e o replace troca os \n por br

    if (texto) {

        ctr.adicionaCartao(texto, "");

        // deleta o text area
        campoTexto.val("").focus();

    }

    $(document).trigger("precisaSincronizar");

});

})(cartaoController);