import { cart } from "../../../controllers/CartController.js";
import { section } from "../../../controllers/SectionController.js";
import { hprice } from "../../../helpers/price.js";
import { Content } from "../Content.js";
import { endBuy } from "./EndBuy.js";

class CartPop extends Content {
    constructor() {
        super();
    }

    html() {
        const div = document.createElement("div");
        div.className = "cart";
        div.innerHTML =  `
            <div>
                <h2>Carrinho</h2>
                <img class="cancel" src="./src/imgs/cancel.png">
            </div>
                <ul id="cart-items">
            </ul>
            <button id="finish-buy">Finalizar Compra</button>
        `
        return div
    }

    addItems() {
        Object.entries(cart.items).forEach(type => {
            Object.entries(type[1]).forEach(item => {
                document.querySelector("#cart-items").innerHTML += `
                    <li>
                        <img src="./src/imgs/catalog/${type[0]}/${item[0]}.png" alt="">
                        <div>
                            <span>Quantidade: ${item[1].quantity}</span>
                            <span>Valor: ${hprice.convertToMoney(item[1].price)}</span>
                        </div>
                        <span class="down-bar"></span>
                    </li>
                `
            })
        })
        
    }

    init() {
        this.addItems();
        this.listeners();
    }

    listeners() {
        document.querySelector("#finish-buy").addEventListener("click", e => {
            document.querySelector(".cart").remove();
            section.haveOnePopUp = false;
            section.addPopUp(endBuy);
        })

        document.querySelector(".cancel").addEventListener("click", e => {
            section.haveOnePopUp = false;
            document.querySelector(".cart").remove();
        })
    }
}

export const cartPopUp = new CartPop();