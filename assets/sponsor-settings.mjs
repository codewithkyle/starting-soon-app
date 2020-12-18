import { setCarouselSpeed, updateElementStyle } from "./app.mjs";
import { Component } from "./component.mjs";
import { fetchCSS } from "./fetch.mjs";
import { mount } from "./mount.mjs";
import { SponsorUploadButton } from "./sponsor-upload-button.mjs";
mount("sponsor-upload-button", SponsorUploadButton);
export default class SponsorSettings extends Component {
    constructor() {
        super();
        this.toggleVisibility = () => {
            this.setState({ visible: this.state.visible ? false : true });
        };
        this.updateCarouselSpeed = () => {
            setCarouselSpeed(parseInt(this.rangeInput.value));
        };
        this.visibilityButton = this.querySelector(".js-toggle-sponsor-view");
        this.container = this.querySelector(".js-container");
        this.rangeInput = this.querySelector(`input[type="range"]`);
        this.state = {
            visible: false,
        };
        fetchCSS(["sponsor-settings", "sponsor-upload-button", "copy-editor"]);
    }
    updated() {
        updateElementStyle("js-sponsor-carousel", "display", `${this.state.visible ? "block" : "none"}`);
    }
    connected() {
        this.visibilityButton.addEventListener("click", this.toggleVisibility);
        this.rangeInput.addEventListener("change", this.updateCarouselSpeed);
    }
    render() {
        this.visibilityButton.setAttribute("state", `${this.state.visible ? "visible" : "hidden"}`);
        if (this.state.visible) {
            this.container.style.display = "block";
        }
        else {
            this.container.style.display = "none";
        }
    }
}
