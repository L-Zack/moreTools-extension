import { abas } from "./tools.js";
import { atualizaIcon } from "./favoritar.js";

var ul = document.querySelectorAll(".list");
var arrow = document.querySelectorAll(".list__arrow");

export function adicionaClass(index) {
    ul[index].classList.add("listagem__list");
    arrow[index].classList.add("listagem__arrow");
}

export function removeClass(index) {
    ul[index].classList.remove("listagem__list");
    arrow[index].classList.remove("listagem__arrow");
}

export function excluiChild(index) {
    for(var i = 0; i < abas[index].length; i++) {
        ul[index].removeChild(ul[index].lastChild);
    }
}

export function montaLi(website, index) {
    const nome = website.nome;
    const url = website.url;
    const icon = website.icon;
    const id = website.id;

    const li = document.createElement("li");
    li.classList.add("list__item");

    const conteudo = 
        `<span class="list__span">
            <a class="list__anchor" href="${url}" target="_blank" rel="noopener noreferrer">
                <img class="list__icon" src="${icon}">${nome}
            </a>
            <img class="list__star" id="${id}" src="img/geral/star-regular.png">
        </span>`;

    ul[index].appendChild(li);
    li.innerHTML = conteudo;
    var imgStar = li.querySelector(".list__star");
    atualizaIcon(imgStar);
}