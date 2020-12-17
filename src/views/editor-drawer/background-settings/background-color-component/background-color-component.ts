import { ColorComponent } from "components/color-component/color-component";
import { setBackgroundColor } from "controllers/app";

export class BackgroundColorComponent extends ColorComponent{
    handleTextColor = () => {
        this.textInput.value = `#${this.textInput.value.replace("#", "")}`;
        this.input.value = this.textInput.value;
        this.label.style.backgroundColor = this.textInput.value;
        setBackgroundColor(this.textInput.value.replace("#", ""));
    }
}