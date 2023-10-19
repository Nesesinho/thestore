import { cart } from "../../../controllers/CartController.js";
import { post } from "../../../controllers/PostController.js";
import { section } from "../../../controllers/SectionController.js";
import { Content } from "../Content.js";
import { clearTimeOutArray } from "../../../helpers/timeout.js";
import { cartPopUp } from "./Cart.js";

class EndBuy extends Content {
    constructor() {
        super();
        this.timeouts = [];
    }

    html() {
        const div = document.createElement("div");
        div.className = "cart";
        div.innerHTML = `
            <div>
                <h2>Carrinho</h2>
                <img class="cancel" src="./src/imgs/cancel.png">
            </div>
            <div class="form">
                <div class="left">
                    <div class="name">
                        <label>Nome</label>
                        <input type="text" id="name">
                    </div>
                    <div class="date">
                        <label>Data de Nascimento</label>
                        <input type="date" id="date">
                    </div>
                </div>
                <span class="horizontal-bar"></span>
                <div class="right">
                    <div class="info">
                        <p>Quantidade de items no carrinho: ${cart.itemsQuantity}</p>
                        <p>Valor total da compra: ${cart.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                    <div class="checkbox">
                        <input type="checkbox" id="checkbox">
                        <label>Eu aceito todos os produtos e seus beneficios</label>
                    </div>
                </div>   
            </div>
            <button id="finish-buy">Comprar</button>
        `

        return div;
    }

    getData() {
        var dataNascimento = new Date(document.querySelector("#date").value);
        var dataAtual = new Date();
        var diferenca = dataAtual - dataNascimento;
        var idade = diferenca / (1000 * 60 * 60 * 24 * 365.25);
        
        let quantidadeDeTiposDeProduto = 0;

        Object.entries(cart.items).forEach(e => {
            quantidadeDeTiposDeProduto += Object.keys(e[1]).length;
        })

        return {
            name: document.querySelector("#name").value,
            age: idade,
            purchased: [quantidadeDeTiposDeProduto, cart.itemsQuantity, cart.totalValue, cart.items],
        };
    }

    error(errorMsg, selector) {
        if (this.errorOnScreen) return;

        this.errorOnScreen = true;

        const span = document.createElement("span");
        span.className = "error";
        span.id = "error";
        span.innerHTML = errorMsg;
        document.querySelector(".form").appendChild(span);
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

    checkInputs() {
        const inputsArray = [document.querySelector("#name"),document.querySelector("#date"),document.querySelector("#checkbox")];
        for (let i = 0; i < inputsArray.length; i++) {
            if([inputsArray[i].value === "", inputsArray[i].value === "", !inputsArray[i].checked][i]) {
                this.error("Preencha todos os campos");
                return false
            }
        }

        return true
    }

    init() {
        this.listeners();
    }

    listeners() {
        document.querySelector(".cancel").addEventListener("click", e => {   
            document.querySelector(".cart").id = "outup";
            clearTimeOutArray(this.timeouts);
            this.timeouts[0] = setTimeout(() => {
                document.querySelector(".cart").remove();
                clearTimeOutArray(this.timeouts);
                section.haveOnePopUp = false;
            }, 1000)
        })

        document.querySelector("#finish-buy").addEventListener("click", e => {
            if (!this.checkInputs()) return;

            post.sendToServer(this.getData())

            document.querySelector(".form").remove();
            const div = document.createElement("div");
            div.className = "endForm";
            div.innerHTML += "<span>Obrigado por comprar na The Store</span>"

            document.querySelector("#finish-buy").remove();
            document.querySelector(".cart").appendChild(div);   

            cart.reset();
        })
    }
}

export const endBuy = new EndBuy();