export class ColorComponent extends HTMLElement {
    constructor() {
        super();
        this.handleColor = () => {
            this.label.style.backgroundColor = this.input.value;
            this.textInput.value = this.input.value;
        };
        this.handleTextColor = () => {
            const value = `${this.textInput.value.replace("#", "")}`;
            this.input.value = `#${value}`;
            this.label.style.backgroundColor = `#${value}`;
        };
        this.focusInput = () => {
            this.textInput.value = this.textInput.value.replace("#", "");
        };
        this.blurInput = () => {
            this.textInput.value = `#${this.textInput.value.replace("#", "")}`;
            this.input.value = this.textInput.value;
            this.label.style.backgroundColor = this.textInput.value;
        };
        this.input = this.querySelector(`input[type="color"]`);
        this.label = this.querySelector("label");
        this.textInput = this.querySelector(`input[type="text"]`);
    }
    connectedCallback() {
        this.input.addEventListener("change", this.handleColor);
        this.textInput.addEventListener("input", this.handleTextColor);
        this.textInput.addEventListener("focus", this.focusInput);
        this.textInput.addEventListener("blur", this.blurInput);
    }
}
