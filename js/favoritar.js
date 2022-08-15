import { abas } from "./tools.js";
import { montaFavorito, buscaObject, removeFavorito, deletaFavorito } from "./favoritarService.js";

export const favoritos = JSON.parse(localStorage.getItem("favoritos")) || {};
export var favoritosUl = document.querySelector(".favoritos__lista");


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
//Adiciona eventListener aos botões de favoritar habilitados 
export function adicionaFavoritar() {
    var websiteStar = document.querySelectorAll(".list__star");
    
    websiteStar.forEach(website => {
        website.addEventListener("click", function favoritar() {
        let websiteId = website.getAttribute("data-li-star");
        let websiteSpan = document.querySelector(`[data-li-span="${websiteId}"]`);

            //Verifica se o botão clicado é de um item já favoritado
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
    }
}


export function atualizaFavoritos(lista) {
    localStorage.setItem("favoritos", JSON.stringify(lista));
}
