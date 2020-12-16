import { loadSponsorLogos } from "controllers/app";

export class SponsorUploadButton extends HTMLElement{
    private input: HTMLInputElement;

    constructor(){
        super();
        this.input = this.querySelector("input");
    }

    private loadImages:EventListener = () => {
        if (this.input.files.length){
            const images:Array<HTMLImageElement> = [];
            for (let i = 0; i < this.input.files.length; i++){
                const img = document.createElement("img");
                img.src = URL.createObjectURL(this.input.files[i]);
                img.draggable = false;
                images.push(img);
            }
            loadSponsorLogos(images);
        } else {
            this.parentElement.setAttribute("state", "waiting");
        }
    }

    connectedCallback(){
        this.input.addEventListener("change", this.loadImages);
    }
}
