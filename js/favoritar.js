import { abas } from "./tools.js";

const favoritos = JSON.parse(localStorage.getItem("favoritos")) || {};
var favoriteUl = document.querySelector(".favoritos__lista");

abas.forEach(categoria => {
    categoria.forEach(website => {

        if(favoritos[website.id]) {
            montaFavorito(website);
            return
        }
        favoritos[website.id] = false;
    })
})

export function adicionaFavoritar() {
    var website = document.querySelectorAll(".list__star");
    
    website.forEach(website => {
        website.addEventListener("click", function favoritar() {
            
            if(favoritos[website.id]) {
                favoritos[website.id] = false;
                atualizaIcon(website);
                atualizaFavoritos(favoritos);
                website.parentElement.classList.remove("list__span--favoritado");
                return;
            }

            let siteObject;

            siteObject = buscaWebsite(website.id);
            favoritos[website.id] = true;
            atualizaFavoritos(favoritos)
            atualizaIcon(website);
            montaFavorito(siteObject);
            website.parentElement.classList.add("list__span--favoritado");
        })
    })
}

export function atualizaIcon(website) {
    if(!favoritos[website.id]) {
        website.setAttribute("src", "./img/geral/star-regular.png");
        return;
    } else {
        website.setAttribute("src", "./img/geral/star-solid.png");
        website.parentElement.classList.add("list__span--favoritado");
    }
}

function atualizaFavoritos(lista) {
    localStorage.setItem("favoritos", JSON.stringify(lista));
}

function montaFavorito(identifier) {
    const nome = identifier.nome;
    const url = identifier.url;
    const icon = identifier.icon;
    const id = identifier.id;

    const li = document.createElement("li");
    li.classList.add("favoritos__item");

    const conteudo = 
        `<span class="list__span">
            <a class="list__anchor" href="${url}" target="_blank" rel="noopener noreferrer">
                <img class="list__icon" src="${icon}">${nome}
            </a>
            <img class="list__star" id="${id}" src="img/geral/star-solid.png">
        </span>`;

    favoriteUl.appendChild(li);
    li.innerHTML = conteudo;
}


function buscaWebsite(id) {
    let object; 

    abas.forEach(categoria => {
        categoria.forEach(website => {
            if(website.id === id) {
                console.log("Dentro do if: " + website.id);
                return object = website;
            }
        })
    })
    return object;
}