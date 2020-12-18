import { ShadowPosition } from "./shadow-position.mjs";
import { ColorPicker } from "./color-picker.mjs";
import { mount } from "./mount.mjs";
import { Component } from "./component.mjs";
import { updateElementStyle } from "./app.mjs";
export class TextShadow extends Component {
    constructor() {
        super();
        this.handleBackdropClick = () => {
            this.disable();
        };
        this.handleBlur = () => {
            this.setState({ blur: this.blurInput.value });
        };
        this.handleOpacity = () => {
            this.setState({ opacity: this.opacityInput.value });
        };
        this.state = {
            position: {
                x: 0,
                y: 0,
            },
            color: "#000000",
            blur: "0",
            opacity: "1",
        };
        this.blurInput = this.querySelector(".js-blur");
        this.opacityInput = this.querySelector(".js-opacity");
    }
    disable() {
        if (this.backdrop) {
            this.backdrop.remove();
        }
        this.style.visibility = "hidden";
    }
    enable() {
        if (this.backdrop) {
            this.backdrop.remove();
        }
        this.style.visibility = "visible";
        this.backdrop = document.createElement("text-shadow-backdrop");
        this.backdrop.addEventListener("click", this.handleBackdropClick);
        this.insertAdjacentElement("beforebegin", this.backdrop);
    }
    updateColor(color) {
        this.setState({ color: color });
    }
    updateBlur(blur) {
        this.setState({ blur: blur });
    }
    updatePosition(x, y) {
        this.setState({ position: {
                x: x,
                y: y,
            } });
    }
    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    updated() {
        const rgb = this.hexToRgb(this.state.color);
        updateElementStyle(this.dataset.lookup, "textShadow", `${this.state.position.x}px ${this.state.position.y}px ${this.state.blur}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.state.opacity})`);
    }
    connectedCallback() {
        mount("color-picker", ColorPicker);
        mount("shadow-position", ShadowPosition);
        this.blurInput.addEventListener("change", this.handleBlur);
        this.opacityInput.addEventListener("change", this.handleOpacity);
    }
}
