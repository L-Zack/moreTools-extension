import { abas } from "./tools.js";
import { nomeAbas } from "./tools.js";

const botao = document.querySelectorAll(".list__button");

    let jaListado = [
        false, false, false, false
    ];

botao.forEach(botao => {
    botao.addEventListener("click", function listagem(){
        var index = nomeAbas.indexOf(botao.innerText);    
        var ul = botao.parentElement;

        if(jaListado[index]) {
            return 0;
        } else {
        abas[index].forEach(website => montaLi(website, ul));
           return jaListado[index] = true; 
        }
    })
})


function montaLi(website, ul) {
    
    const nome = website.nome;
    const url = website.url;
    const icon = website.icon;

    const li = document.createElement("li");
    li.classList.add("list__item");

    const conteudo = 
        `<span class="list__span">
            <img class="list__icon" src="${icon}">
            <a class="list__anchor" href="${url}" target="_blank" rel="noopener noreferrer">${nome}</a>
            <img class="list__star" src="img/geral/star-regular.png">
        </span>`;

    ul.appendChild(li);
    li.innerHTML = conteudo;

}
