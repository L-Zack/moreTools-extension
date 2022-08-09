import { abas } from "./tools.js";

const favoritos = JSON.parse(localStorage.getItem("favoritos")) || {};
var favoritosUl = document.querySelector(".favoritos__lista");

abas.forEach(categoria => {
    categoria.forEach(website => {

        if(favoritos[website.id]) {
            montaFavorito(website);
            deletaFavorito(website.id);
            return
        }
        favoritos[website.id] = false;
    })
})

export function adicionaFavoritar() {
    var websiteStar = document.querySelectorAll(".list__star");
    
    websiteStar.forEach(website => {
        website.addEventListener("click", function favoritar() {
        let websiteId = website.getAttribute("data-li-star");
        let websiteSpan = document.querySelector(`[data-li-span="${websiteId}"]`);

            if(favoritos[websiteId]) {
                favoritos[websiteId] = false;
                atualizaIcon(website);
                atualizaFavoritos(favoritos);
                removeFavorito(websiteId);
                websiteSpan.classList.remove("list__span--favoritado");
                return;
            }

            let siteObject;
            siteObject = buscaObject(websiteId);
            favoritos[websiteId] = true;
            atualizaFavoritos(favoritos)
            atualizaIcon(website);
            montaFavorito(siteObject);
            deletaFavorito(websiteId);
            websiteSpan.classList.add("list__span--favoritado");        
        })
    })
}

export function atualizaIcon(liStar) {
    if(!favoritos[liStar.id]) {
        liStar.setAttribute("src", "./img/geral/star-regular.png");
        return;
    } else {
        liStar.setAttribute("src", "./img/geral/star-solid.png");
        liStar.parentElement.classList.add("list__span--favoritado");
        console.log(liStar.parentElement);
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
    li.setAttribute("data-favoritado-li", id);
    li.classList.add("favoritos__item");
    li.setAttribute("id", id);

    const conteudo = 
        `<span class="list__span">
            <a class="list__anchor" href="${url}" target="_blank" rel="noopener noreferrer">
                <img class="list__icon" src="${icon}">${nome}
            </a>
            <img class="favorite__star" data-favoritado="${id}" src="img/geral/trash.png">
        </span>`;

    favoritosUl.appendChild(li);
    li.innerHTML = conteudo;
}

function buscaObject(id) {
    let object; 

    abas.forEach(categoria => {
        categoria.forEach(websiteObject => {
            if(websiteObject.id === id) {
                return object = websiteObject;
            }
        })
    })
    return object;
}

function removeFavorito(favorito) {
    favoritosUl.removeChild(favoritosUl.children[favorito]);
}

function deletaFavorito(identificador) {
    const trashButton = document.querySelector(`[data-favoritado="${identificador}"]`);

    trashButton.addEventListener("click", function () {
        const liAlvo = document.querySelector(`[data-favoritado-li="${identificador}"]`);
        
        liAlvo.remove();
        favoritos[identificador] = false;
        atualizaFavoritos(favoritos);

        try {
            let liStar = document.querySelector(`[data-li-star="${identificador}"]`);
            let liSpan = document.querySelector(`[data-li-span="${identificador}"]`);

            liSpan.classList.remove("list__span--favoritado");
            atualizaIcon(liStar);
        } catch {}
    })
}