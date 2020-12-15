export class ColorComponent extends HTMLElement{
    private input:HTMLInputElement;
    private label:HTMLLabelElement;
    private textInput:HTMLInputElement;

    constructor(){
        super();
        this.input = this.querySelector(`input[type="color"]`);
        this.label = this.querySelector("label");
        this.textInput = this.querySelector(`input[type="text"]`);
    }

    private handleColor:EventListener = () => {
        this.label.style.backgroundColor = this.input.value;
        this.textInput.value = this.input.value;
    }

    private handleTextColor:EventListener = () => {
        const value = `${this.textInput.value.replace("#", "")}`;
        this.input.value = `#${value}`;
        this.label.style.backgroundColor = `#${value}`;
    }

    private focusInput:EventListener = () => {
        this.textInput.value = this.textInput.value.replace("#", "");
    }

    private blurInput:EventListener = () => {
        this.textInput.value = `#${this.textInput.value.replace("#", "")}`;
        this.input.value = this.textInput.value;
        this.label.style.backgroundColor = this.textInput.value;
    }

    connectedCallback(){
        this.input.addEventListener("change", this.handleColor);
        this.textInput.addEventListener("input", this.handleTextColor);
        this.textInput.addEventListener("focus", this.focusInput);
        this.textInput.addEventListener("blur", this.blurInput);
    }
}