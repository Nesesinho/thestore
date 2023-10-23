import { contentItems } from "../components/items.js";
import { useStore } from "../store/useStore.js";

class Cart {
    constructor() {
        this._items = useStore('items', {
            eletronics: {}
        });
        this._totalValue = useStore('totalValue', 0);
        this._itemsQuantity = useStore('itemsQuantity', 0);

        this.reload();
    }

    reset() {
        this._items.value = {
            eletronics: {}
        };
        this._totalValue.value = 0;
        this._itemsQuantity.value = 0;

        this.reload();
    }

    add(id, type) {
        this._itemsQuantity.value++
        this.reload();

        if (this._items.value[type][id]) {
            this._changeItems(type, id, {
                quantity: this._items.value[type][id].quantity + 1,
            })

            this._totalValue.value += this._items.value[type][id].price;
            return
        };

        this._changeItems(type, id, contentItems[type][id]);
        this._changeItems(type, id, { quantity: 1 });

        this._totalValue.value += this._items.value[type][id].price;
    }

    _changeItems(type, id, content) {
        this._items.value = {
            [type]: {
                ...this._items.value[type],
                [id]: {
                    ...this._items.value[type][id],
                    ...content
                }
            }
        }
    }

    reload() {
        document.querySelector("#cart-items-quantity").innerHTML = this._itemsQuantity.value;
    }

    get items() {
        return this._items.value;
    }
    get totalValue() {
        return this._totalValue.value;
    }
    get itemsQuantity() {
        return this._itemsQuantity.value;
    }
}

export const cart = new Cart();