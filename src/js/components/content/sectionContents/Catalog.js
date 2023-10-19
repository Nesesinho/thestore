import { cart } from "../../../controllers/CartController.js";
import { hprice } from "../../../helpers/price.js";
import { contentItems } from "../../items.js";
import { Content } from "../Content.js";

export class Catalog extends Content {
    constructor(type) {
        super();
        this.type = type;
        this.size = "90%";
        this.name = "catalog";
    }

    static productsOnSale = 4;

    html() {
        return `
                <ul id="catalog-items">
                </ul>
        `;
    };
    
    init(){
        this.addItems(contentItems);
    };
    
    addItems(itensObj) {
        const catalogUl = document.querySelector("#catalog-items");
        Object.entries(itensObj[this.type]).forEach((el, i) => {
            console.log(Catalog.productsOnSale)
            if (i >= Catalog.productsOnSale) return;   

            let li = document.createElement("li");
            li.innerHTML = `
                <img src="./src/imgs/catalog/${this.type}/${el[0]}.png" alt="">
                <p class="name">${el[1].name}</p>
                <p class="price">${hprice.convertToMoney(el[1].price)}</p>
            `

            let notEl;
            if(itensObj !== contentItems) {
                notEl = document.createElement("span");
                notEl.className = "notification";
                notEl.innerHTML = "!";
                li.appendChild(notEl);

                li.style.opacity = 0;
                setTimeout(() => {
                    li.style.opacity = 100;
                }, 200)
            }

            let btn = document.createElement("button");
            btn.innerHTML = "Adicionar ao carrinho";
            btn.addEventListener("click", e => {
                cart.add(el[0], this.type);

                if (cart.itemsQuantity >= (Catalog.productsOnSale - 3) * 5 * 2) {
                    let itensToAdd = {};
                    itensToAdd[this.type] = {};

                    Object.entries(contentItems[this.type]).forEach((e,i) => {
                        if (i < Catalog.productsOnSale || i > Catalog.productsOnSale + 1) return;
                        itensToAdd[this.type][e[0]] = e[1];
                    })
                    Catalog.productsOnSale += 2;
                    this.addItems(itensToAdd)
                }

                if(itensObj !== contentItems) {
                    notEl.remove();
                }
            })

            li.appendChild(btn);
            catalogUl.appendChild(li);
        })
    }

    listeners(){
        return undefined;
    };
}