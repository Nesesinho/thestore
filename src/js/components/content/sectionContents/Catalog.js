import { cart } from "../../../controllers/CartController.js";
import { contentItems } from "../../items.js";
import { Content } from "../Content.js";

export class Catalog extends Content {
    constructor(type) {
        super();
        this.type = type;
        this.size = "90%";
        this.name = "catalog";
    }
    
    html() {
        return `
                <ul id="catalog-items">
                </ul>
        `;
    };
    
    init(){
        this.addItems();
    };
    
    addItems() {
        const catalogUl = document.querySelector("#catalog-items");
        Object.entries(contentItems[this.type]).forEach(el => {
            let li = document.createElement("li");
            li.innerHTML = `
                <img src="./src/imgs/catalog/${this.type}/${el[0]}.png" alt="">
                <p class="name">${el[1].name}</p>
                <p class="price">${el[1].price} R$</p>
            `

            let btn = document.createElement("button");
            btn.innerHTML = "Adicionar ao carrinho";
            btn.addEventListener("click", e => {
                console.log(el[0]);
                cart.add(el[0], this.type);
            })

            li.appendChild(btn);
            catalogUl.appendChild(li);
        })
    }

    listeners(){
        return undefined;
    };
}