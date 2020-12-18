export class ColorPicker extends HTMLElement {
    constructor() {
        super();
        this.updateColor = () => {
            this.icon.style.backgroundColor = this.input.value;
            // @ts-ignore
            this.parentElement.updateColor(this.input.value);
        };
        this.input = this.querySelector("input");
        this.icon = this.querySelector("i");
    }
    connectedCallback() {
        this.input.addEventListener("change", this.updateColor);
    }
}
