import { abas } from "./tools.js";
import { favoritos, favoritosUl } from "./favoritar.js";
import { atualizaIcon, atualizaFavoritos } from "./favoritar.js";

export function montaFavorito(object) {
    const nome = object.nome;
    const url = object.url;
    const icon = object.icon;
    const id = object.id;

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
//Busca no banco de dados o objeto do website em questão
export function buscaObject(id) {
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
//Remove o elemento favoritado
export function removeFavorito(favorito) {
    favoritosUl.removeChild(favoritosUl.children[favorito]);
}
//Deleta a li criada para o website favoritado
export function deletaFavorito(identificador) {
    const trashButton = document.querySelector(`[data-favoritado="${identificador}"]`);

    trashButton.addEventListener("click", function () {
        const liAlvo = document.querySelector(`[data-favoritado-li="${identificador}"]`);
        
        liAlvo.remove();
        favoritos[identificador] = false;
        atualizaFavoritos(favoritos);

        //Se a aba com o website estiver habilitada, remove os efeitos de favoritar
        try {
            let liStar = document.querySelector(`[data-li-star="${identificador}"]`);
            let liSpan = document.querySelector(`[data-li-span="${identificador}"]`);

            liSpan.classList.remove("list__span--favoritado");
            atualizaIcon(liStar);
        } catch {}
    })
}