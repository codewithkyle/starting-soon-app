import { Component } from "djinnjs/component";
import { updateElementStyle, updateText } from "../../app";

type State = {
    visibility: boolean;
    bold: boolean;
    fontSize: number;
};

export default class CopyEditor extends Component<State>{
    private visibilityButton:HTMLButtonElement;
    private textarea:HTMLTextAreaElement;
    private boldButton:HTMLButtonElement;
    private increaseButton:HTMLButtonElement;
    private decreaseButton:HTMLButtonElement;

    constructor(){
        super();
        
        this.visibilityButton = this.querySelector(".js-toggle-visiblity-button");
        this.textarea = this.querySelector("textarea");
        this.boldButton = this.querySelector(".js-toggle-bold-button");
        this.increaseButton = this.querySelector(".js-enlarge-text-button");
        this.decreaseButton = this.querySelector(".js-shrink-text-button");

        this.state = {
            visibility: false,
            bold: false,
            fontSize: 1,
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

    connected(){
        this.visibilityButton.addEventListener("click", this.toggleVisibility);
        this.textarea.addEventListener("keyup", this.updateText);
        this.boldButton.addEventListener("click", this.toggleBold);
        this.increaseButton.addEventListener("click", this.increaseFontSize);
        this.decreaseButton.addEventListener("click", this.decreaseFontSize);
    }

    updated(){
        updateElementStyle(this.dataset.lookup, "display", this.state.visibility ? "block" : "none");
        updateElementStyle(this.dataset.lookup, "fontWeight", this.state.bold ? "bold" : "400");
        updateElementStyle(this.dataset.lookup, "fontSize", `${this.state.fontSize}rem`);
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