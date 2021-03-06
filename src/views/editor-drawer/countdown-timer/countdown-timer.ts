import { Component } from "djinnjs/component";
import { updateElementStyle, setTimer, toggleTimerCountdown } from "controllers/app";
import { TextShadow } from "components/text-shadow/text-shadow";
import { mount } from "utils/mount";
import { fetchCSS } from "djinnjs/fetch";
import { TimerComponet } from "./timer-component/timer-component";
import { FontSelect } from "components/font-select/font-select";

type State = {
    visibility: boolean;
    bold: boolean;
    fontSize: number;
    color: string;
    playing: boolean;
};

export default class CountdownTimer extends Component<State>{
    private visibilityButton:HTMLButtonElement;
    private boldButton:HTMLButtonElement;
    private increaseButton:HTMLButtonElement;
    private decreaseButton:HTMLButtonElement;
    private colorInput:HTMLInputElement;
    private colorInputIcon:HTMLElement;
    private shadowButton:HTMLButtonElement;
    private shadowComponent:TextShadow;
    private playbackButton:HTMLButtonElement;
    private fontButton:HTMLButtonElement;
    private fontComponent:FontSelect;

    constructor(){
        super();
        
        this.visibilityButton = this.querySelector(".js-toggle-visiblity-button");
        this.boldButton = this.querySelector(".js-toggle-bold-button");
        this.increaseButton = this.querySelector(".js-enlarge-text-button");
        this.decreaseButton = this.querySelector(".js-shrink-text-button");
        this.colorInput = this.querySelector(".js-color-input");
        this.colorInputIcon = this.querySelector(".js-color-input-icon");
        this.shadowButton = this.querySelector(".js-shadow-button");
        this.shadowComponent = this.querySelector("text-shadow");
        this.playbackButton = this.querySelector(".js-playback-button");
        this.fontButton = this.querySelector(".js-font-family-button");
        this.fontComponent = this.querySelector("font-select");

        this.state = {
            visibility: false,
            bold: false,
            fontSize: 1,
            color: "#000000",
            playing: false,
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

    public updateTime(value:number){
        setTimer(value);
    }

    private togglePlayback:EventListener = () => {
        toggleTimerCountdown();
        this.setState({playing: this.state.playing ? false : true});
    }

    private showFontSelect:EventListener = () => {
        this.fontComponent.enable();
    }

    connected(){
        this.visibilityButton.addEventListener("click", this.toggleVisibility);
        this.boldButton.addEventListener("click", this.toggleBold);
        this.increaseButton.addEventListener("click", this.increaseFontSize);
        this.decreaseButton.addEventListener("click", this.decreaseFontSize);
        this.colorInput.addEventListener("change", this.updateColor);
        this.shadowButton.addEventListener("click", this.showTextShadow);
        this.playbackButton.addEventListener("click", this.togglePlayback);
        this.fontButton.addEventListener("click", this.showFontSelect);

        mount("text-shadow", TextShadow);
        mount("timer-component", TimerComponet);
        mount("font-select", FontSelect);

        fetchCSS(["text-shadow", "shadow-position", "color-picker", "countdown-timer", "input-component", "font-select"]);
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

        if (this.state.playing){
            this.playbackButton.setAttribute("state", "playing");
            this.playbackButton.setAttribute("aria-label", "stop countdown");
        }else{
            this.playbackButton.setAttribute("state", "paused");
            this.playbackButton.setAttribute("aria-label", "start countdown");
        }
    }
}