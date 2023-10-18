import { contentItems } from "../components/items.js";

class Cart {
    constructor() {
        this.items = {
            eletronics: {}
        };
        this.totalValue = 0;
        this.itemsQuantity = 0;
    }

    reset() {
        this.items = {
            eletronics: {}
        };
        this.totalValue = 0;
        this.itemsQuantity = 0;

        this.reload();
    }

    add(id, type) {
        this.itemsQuantity++
        this.reload();

        if (this.items[type][id]) {
            this.items[type][id].quantity += 1
            this.totalValue += this.items[type][id].price;
            return
        };

        this.items[type][id] = contentItems[type][id];
        console.log(this.items)
        this.items[type][id].quantity = 1;

        this.totalValue += this.items[type][id].price;
    }

    reload() {
        document.querySelector("#cart-items-quantity").innerHTML = this.itemsQuantity;
    }
}

export const cart = new Cart();