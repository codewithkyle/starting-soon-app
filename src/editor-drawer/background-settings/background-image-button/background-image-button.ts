import { loadBackgroundImage } from "../../../app";

export class BackgroundImageButton extends HTMLElement{
    private input:HTMLInputElement;

    constructor(){
        super();
        this.input = this.querySelector("input");
    }

    private handleFile:EventListener = () => {
        if (this.input.files.length){
            const url = URL.createObjectURL(this.input.files[0]);
            loadBackgroundImage(url);
        }
    }

    connectedCallback(){
        this.input.addEventListener("change", this.handleFile);
    }
}
