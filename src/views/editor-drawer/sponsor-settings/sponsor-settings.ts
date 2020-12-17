import { setCarouselSpeed, updateElementStyle } from "controllers/app";
import { Component } from "djinnjs/component";
import { fetchCSS } from "djinnjs/fetch";
import { mount } from "utils/mount";

import { SponsorUploadButton } from "./sponsor-upload-button/sponsor-upload-button";
mount("sponsor-upload-button", SponsorUploadButton);

type State = {
    visible: boolean;
};

export default class SponsorSettings extends Component<State>{
    private visibilityButton:HTMLButtonElement;
    private container:HTMLElement;
    private rangeInput:HTMLInputElement;

    constructor(){
        super();

        this.visibilityButton = this.querySelector(".js-toggle-sponsor-view");
        this.container = this.querySelector(".js-container");
        this.rangeInput = this.querySelector(`input[type="range"]`);

        this.state = {
            visible: false,
        };

        fetchCSS(["sponsor-settings", "sponsor-upload-button", "copy-editor"]);
    }

    private toggleVisibility:EventListener = () => {
        this.setState({visible: this.state.visible ? false : true});
    }

    private updateCarouselSpeed:EventListener = () => {
        setCarouselSpeed(parseInt(this.rangeInput.value));
    }

    updated(){
        updateElementStyle("js-sponsor-carousel", "display", `${this.state.visible ? "block" : "none"}`);
    }

    connected(){
        this.visibilityButton.addEventListener("click", this.toggleVisibility);
        this.rangeInput.addEventListener("change", this.updateCarouselSpeed);
    }

    render(){
        this.visibilityButton.setAttribute("state", `${this.state.visible ? "visible" : "hidden"}`);
        if (this.state.visible){
            this.container.style.display = "block";
        } else {
            this.container.style.display = "none";
        }
    }
}