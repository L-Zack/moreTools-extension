import { abas } from "./tools.js";
import { nomeAbas } from "./tools.js";

const aba = document.getElementById("base");

//Cria as abas, ponto de partida da aplicação
nomeAbas.forEach(categoria => {
    
    const ul = document.createElement("ul");
    ul.classList.add("list");

    var conteudo = ` 
        <button class="list__button" name="${categoria}">
        <img class="list__arrow" src="img/geral/arrow.png"> 
        ${categoria}
        </button>
        `;
    aba.appendChild(ul);
    ul.innerHTML = conteudo;
})
