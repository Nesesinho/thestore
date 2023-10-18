import { cart } from "../../../controllers/CartController.js";
import { section } from "../../../controllers/SectionController.js";
import { hprice } from "../../../helpers/price.js";
import { clearTimeOutArray } from "../../../helpers/timeout.js";
import { Content } from "../Content.js";
import { endBuy } from "./EndBuy.js";

class CartPop extends Content {
    constructor() {
        super();
        this.timeouts = [];
        this.errorOnScreen = false;
    }

    html() {
        const div = document.createElement("div");
        div.className = "cart";
        div.id = "outup";
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

    error(errorMsg) {
        if (this.errorOnScreen) return;

        this.errorOnScreen = true;

        const span = document.createElement("span");
        span.className = "error";
        span.id = "error";
        span.innerHTML = errorMsg;
        document.querySelector("#cart-items").appendChild(span);
        setTimeout(() => {
            span.style.transform = "translate(-50%, -50%)";
        }, 100);
        setTimeout(() => {
            span.style.transform = "translate(-50%, 500%)";
        }, 1000);
        setTimeout(() => {
            span.remove();
            this.errorOnScreen = false
        }, 1200)
    } 

    init() {
        this.timeouts[0] = setTimeout(() => {
            document.querySelector(".cart").id = "";
        }, 100)
        this.addItems();
        this.listeners();
    }

    listeners() {
        document.querySelector("#finish-buy").addEventListener("click", e => {
            if (cart.itemsQuantity === 0) {
                this.error("Seu carrinho está vazio");
                return
            }

            clearTimeOutArray(this.timeouts);
            document.querySelector(".cart").remove();
            section.haveOnePopUp = false;
            section.addPopUp(endBuy);
        })

        document.querySelector(".cancel").addEventListener("click", e => {
            
            document.querySelector(".cart").id = "outup";
            this.timeouts[1] = setTimeout(() => {
                document.querySelector(".cart").remove();
                section.haveOnePopUp = false;
                clearTimeOutArray(this.timeouts);
            }, 1000)
        })
    }
}

export const cartPopUp = new CartPop();