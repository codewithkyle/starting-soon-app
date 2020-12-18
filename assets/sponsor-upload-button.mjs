import { loadSponsorLogos } from "./app.mjs";
export class SponsorUploadButton extends HTMLElement {
    constructor() {
        super();
        this.loadImages = () => {
            if (this.input.files.length) {
                const images = [];
                for (let i = 0; i < this.input.files.length; i++) {
                    const img = document.createElement("img");
                    img.src = URL.createObjectURL(this.input.files[i]);
                    img.draggable = false;
                    images.push(img);
                }
                loadSponsorLogos(images);
            }
            else {
                this.parentElement.setAttribute("state", "waiting");
            }
        };
        this.input = this.querySelector("input");
    }
    connectedCallback() {
        this.input.addEventListener("change", this.loadImages);
    }
}
