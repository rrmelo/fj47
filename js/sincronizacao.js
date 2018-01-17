(function(ctr){

    "use strict";

const usuario = "rrmelo@gmail.com";

$("#sync").click(function () {
   $(document).trigger("precisaSincronizar")
});

 $.getJSON("https://ceep.herokuapp.com/cartoes/carregar?callback=?", { usuario },
    function (res) {

        res.cartoes.reverse().forEach(function (cartao) {
            ctr.adicionaCartao(cartao.conteudo, "");
        })

})

$(document).on("precisaSincronizar", function(){

    $("#sync").removeClass("botaoSync--sincronizado");
    $("#sync").addClass("botaoSync--esperando");
    const cartoes = []; //array

    $(".cartao").each(function () {
        const cartao = {};
        cartao.conteudo = $(this).find(".cartao-conteudo").html();
        cartoes.push(cartao);
    });

    //console.log(cartoes);
    //cartao.reverse();
    // const mural = {usuario, cartoes}; object short hand

    const mural = {
        usuario: usuario,
        cartoes: cartoes
    };

    console.log(mural);

    $.ajax({

        url: "https://ceep.herokuapp.com/cartoes/salvar",
        method: "post",
        data: mural,
        success: function (res) {
            //alert("deu certo");
            console.log(res.quantidade + "cartões salvos em " + res.usuario);
            $("#sync").addClass("botaoSync--sincronizado");
        },
        error: function () {
            //alert("deu erro");
            $("#sync").addClass("botaoSync--deuRuim");
        },
        complete: function () {
            $("#sync").removeClass("botaoSync--esperando");
        }

    });
    
});

})(cartaoController);

