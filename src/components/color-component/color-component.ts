export class ColorComponent extends HTMLElement{
    public input:HTMLInputElement;
    public label:HTMLLabelElement;
    public textInput:HTMLInputElement;

    constructor(){
        super();
        this.input = this.querySelector(`input[type="color"]`);
        this.label = this.querySelector("label");
        this.textInput = this.querySelector(`input[type="text"]`);
    }

    public handleColor:EventListener = () => {
        this.label.style.backgroundColor = this.input.value;
        this.textInput.value = this.input.value;
    }

    public handleTextColor:EventListener = () => {
        const value = `${this.textInput.value.replace("#", "")}`;
        this.input.value = `#${value}`;
        this.label.style.backgroundColor = `#${value}`;
    }

    public focusInput:EventListener = () => {
        this.textInput.value = this.textInput.value.replace("#", "");
    }

    public blurInput:EventListener = () => {
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