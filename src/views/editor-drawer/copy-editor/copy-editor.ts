import { Component } from "djinnjs/component";
import { updateElementStyle, updateText } from "controllers/app";
import { TextShadow } from "components/text-shadow/text-shadow";
import { mount } from "utils/mount";
import { fetchCSS } from "djinnjs/fetch";
import { FontSelect } from "components/font-select/font-select";

type State = {
    visibility: boolean;
    bold: boolean;
    fontSize: number;
    color: string;
};

export default class CopyEditor extends Component<State>{
    private visibilityButton:HTMLButtonElement;
    private textarea:HTMLTextAreaElement;
    private boldButton:HTMLButtonElement;
    private increaseButton:HTMLButtonElement;
    private decreaseButton:HTMLButtonElement;
    private colorInput:HTMLInputElement;
    private colorInputIcon:HTMLElement;
    private shadowButton:HTMLButtonElement;
    private shadowComponent:TextShadow;
    private fontButton:HTMLButtonElement;
    private fontComponent:FontSelect;

    constructor(){
        super();
        
        this.visibilityButton = this.querySelector(".js-toggle-visiblity-button");
        this.textarea = this.querySelector("textarea");
        this.boldButton = this.querySelector(".js-toggle-bold-button");
        this.increaseButton = this.querySelector(".js-enlarge-text-button");
        this.decreaseButton = this.querySelector(".js-shrink-text-button");
        this.colorInput = this.querySelector(".js-color-input");
        this.colorInputIcon = this.querySelector(".js-color-input-icon");
        this.shadowButton = this.querySelector(".js-shadow-button");
        this.shadowComponent = this.querySelector("text-shadow");
        this.fontButton = this.querySelector(".js-font-family-button");
        this.fontComponent = this.querySelector("font-select");

        this.state = {
            visibility: false,
            bold: false,
            fontSize: 1,
            color: "#000000",
        };
    }

    private toggleVisibility:EventListener = () => {
        if (this.state.visibility){
            this.setState({ visibility: false });
        }else{
            this.setState({ visibility: true });
        }
    };

    private toggleBold:EventListener = () => {
        if (this.state.bold){
            this.setState({ bold: false });
        }else{
            this.setState({ bold: true });
        }
    };

    private updateText:EventListener = () => {
        updateText(this.dataset.lookup, this.textarea.value);
    }

    private increaseFontSize:EventListener = () => {
        this.setState({fontSize: this.state.fontSize + 0.25});
    }

    private decreaseFontSize:EventListener = () => {
        const updatedState = {...this.state};
        updatedState.fontSize -= 0.25;
        if (updatedState.fontSize < 1){
            updatedState.fontSize = 1;
        }
        this.setState(updatedState);
    }

    private updateColor:EventListener = () => {
        this.setState({color: this.colorInput.value});
        this.colorInputIcon.style.backgroundColor = this.colorInput.value;
    }

    private showTextShadow:EventListener = () => {
        this.shadowComponent.enable();
    }

    private showFontSelect:EventListener = () => {
        this.fontComponent.enable();
    }

    connected(){
        this.visibilityButton.addEventListener("click", this.toggleVisibility);
        this.textarea.addEventListener("keyup", this.updateText);
        this.boldButton.addEventListener("click", this.toggleBold);
        this.increaseButton.addEventListener("click", this.increaseFontSize);
        this.decreaseButton.addEventListener("click", this.decreaseFontSize);
        this.colorInput.addEventListener("change", this.updateColor);
        this.shadowButton.addEventListener("click", this.showTextShadow);
        this.fontButton.addEventListener("click", this.showFontSelect);

        mount("text-shadow", TextShadow);
        mount("font-select", FontSelect);

        fetchCSS(["text-shadow", "shadow-position", "color-picker", "copy-editor", "font-select"]);
    }

    updated(){
        updateElementStyle(this.dataset.lookup, "display", this.state.visibility ? "block" : "none");
        updateElementStyle(this.dataset.lookup, "fontWeight", this.state.bold ? "bold" : "400");
        updateElementStyle(this.dataset.lookup, "fontSize", `${this.state.fontSize}rem`);
        updateElementStyle(this.dataset.lookup, "color", this.state.color);
    }

    render(){
        if (this.state.visibility){
            this.visibilityButton.setAttribute("state", "visible");
            this.visibilityButton.setAttribute("aria-label", "disable heading");
        }else{
            this.visibilityButton.setAttribute("state", "hidden");
            this.visibilityButton.setAttribute("aria-label", "enable heading");
        }

        if (this.state.bold){
            this.boldButton.setAttribute("state", "bold");
            this.boldButton.setAttribute("aria-label", "unbold heading");
        }else{
            this.boldButton.setAttribute("state", "regular");
            this.boldButton.setAttribute("aria-label", "bold heading");
        }
    }
}