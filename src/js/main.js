import { cartPopUp } from "./components/content/popUp/Cart.js";
import { Catalog } from "./components/content/sectionContents/Catalog.js";
import { section } from "./controllers/SectionController.js";

const sections = document.querySelector("#sections").querySelectorAll("li");

sections.forEach((e, i) => {
    e.addEventListener("click", e => {
        section.changeContent(new Catalog(["eletronics", "pcs", "cars"][i]));
    })
})

document.querySelector("#cart-icon").addEventListener("click", e => {
    section.addPopUp(cartPopUp);
    console.log("Oi")
})