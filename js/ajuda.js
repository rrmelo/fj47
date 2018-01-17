(function (ctr) {

    "use strict";

    $("#ajuda").click(function () {

        $.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes", function (res) {

            res.instrucoes.forEach(function (cartao) {

                ctr.adicionaCartao(cartao.conteudo, cartao.cor);

            });

        });

    });

})(cartaoController);