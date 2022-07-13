import { abas } from "./tools.js";

var favoritos = new Object();

abas.forEach(categoria => {
    categoria.forEach(website => {
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
                return;
            }
            favoritos[website.id] = true;
            atualizaIcon(website);
        })
    })
}

export function atualizaIcon(website) {
    if(!favoritos[website.id]) {
        website.setAttribute("src", "./img/geral/star-regular.png");
        return;
    } else {
        website.setAttribute("src", "./img/geral/star-solid.png");
    }
}
