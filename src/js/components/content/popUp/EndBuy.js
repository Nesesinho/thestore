import { cart } from "../../../controllers/CartController.js";
import { post } from "../../../controllers/PostController.js";
import { section } from "../../../controllers/SectionController.js";
import { Content } from "../Content.js";

class EndBuy extends Content {
    constructor() {
        super();
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
        var idade = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));
        
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

    init() {
        this.listeners();
    }

    listeners() {
        document.querySelector(".cancel").addEventListener("click", e => {
            section.haveOnePopUp = false;
            document.querySelector(".cart").remove();
        })

        document.querySelector("#finish-buy").addEventListener("click", e => {
            console.log(this.getData());
            post.sendToServer(this.getData());
        })
    }
}

export const endBuy = new EndBuy();