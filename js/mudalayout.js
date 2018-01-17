(function(){

    "use strict";

function mudalayout() { /* function declaration */

    /* console.log(mural); pra testar no console no f12 do chrome */
    const adicionouClasse = mural.classList.toggle("mural--linhas");

    if (adicionouClasse) {
        this.textContent = "blocos";
    }
    else {
        this.textContent = "linhas";
    }

}

const mural = document.querySelector(".mural");
const botao = document.querySelector("#mudalayout");

/* console.log(botao); ver no console */

/* botao.onclick = mudalayout; se colocar o () ele executa sem chamar */

botao.addEventListener("click", mudalayout);


/* o var mudou para let eh a memsa coisa e o const eh a variavel que nao pode mudar */

})();