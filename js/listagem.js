import { abas } from "./tools.js";
import { nomeAbas } from "./tools.js";
import { adicionaClass, removeClass, excluiChild, montaLi } from "./service.js";
import { adicionaFavoritar, atualizaIcon } from "./favoritar.js";

const botao = document.querySelectorAll(".list__button");
let jaListado = [];

for(var i = 0; i < botao.length; i++) {
        jaListado[i] = false;
}

botao.forEach(botao => {
    botao.addEventListener("click", function listagem(){
        var index = nomeAbas.indexOf(botao.innerText);    

        if(jaListado[index]) {
            excluiChild(index);
            removeClass(index);

            return jaListado[index] = false;
        } else {
            abas[index].forEach(website => montaLi(website, index));
            adicionaClass(index);
            adicionaFavoritar();
            return jaListado[index] = true; 
        }
    })
}) 
