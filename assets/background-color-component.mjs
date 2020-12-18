import { ColorComponent } from "./color-component.mjs";
import { setBackgroundColor } from "./app.mjs";
export class BackgroundColorComponent extends ColorComponent {
    constructor() {
        super(...arguments);
        this.handleTextColor = () => {
            this.textInput.value = `#${this.textInput.value.replace("#", "")}`;
            this.input.value = this.textInput.value;
            this.label.style.backgroundColor = this.textInput.value;
            setBackgroundColor(this.textInput.value.replace("#", ""));
        };
    }
}
