import { loadBackgroundImage } from "./app.mjs";
export class BackgroundImageButton extends HTMLElement {
    constructor() {
        super();
        this.handleFile = () => {
            if (this.input.files.length) {
                const url = URL.createObjectURL(this.input.files[0]);
                loadBackgroundImage(url);
            }
        };
        this.input = this.querySelector("input");
    }
    connectedCallback() {
        this.input.addEventListener("change", this.handleFile);
    }
}
