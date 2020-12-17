export class ColorPicker extends HTMLElement{
    private input: HTMLInputElement;
    private icon: HTMLElement;

    constructor(){
        super();
        this.input = this.querySelector("input");
        this.icon = this.querySelector("i");
    }

    private updateColor:EventListener = () => {
        this.icon.style.backgroundColor = this.input.value;
        // @ts-ignore
        this.parentElement.updateColor(this.input.value);
    }

    connectedCallback(){
        this.input.addEventListener("change", this.updateColor);
    }
}