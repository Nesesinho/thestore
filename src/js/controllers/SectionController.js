class Section {
    constructor() {
        this.onTransition = false;
        this.haveOnePopUp = false;
    }

    changeContent(contentClass) {
        const insideSection = document.querySelector(".inside-section");
        const contentBox = document.querySelector("#content-box")

        if (this.onTransition) return;

        this.onTransition = true;
        setTimeout(() => {insideSection.style.height = contentClass.size;}, 200);
        contentBox.classList.add("outr");

        setTimeout(() => {
            contentBox.style.display = "none";
            contentBox.classList.add("outl");   
            contentBox.classList.remove("outr");
        }, 400);
        
        setTimeout(() => {
            contentBox.style.display = "flex";
        }, 500)
        
        setTimeout(() => {
            contentBox.className = `${contentClass.name}`;
            contentBox.innerHTML = contentClass.html();
    
            contentClass.init();
        }, 750);        

        setTimeout(() => {
            this.onTransition = false;
        }, 1000);
    }

    addPopUp(popUpClass) {
        const section = document.querySelector("#main-section");

        console.log(popUpClass);
        console.log(this.haveOnePopUp);
        if (this.haveOnePopUp) return;


        this.haveOnePopUp = true;
        section.appendChild(popUpClass.html());
        popUpClass.init();
    }
}

export const section = new Section();