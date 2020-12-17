import { ShadowPosition } from "./shadow-position/shadow-position";
import { ColorPicker } from "./color-picker/color-picker";
import { mount } from "utils/mount";
import { Component } from "djinnjs/component";
import { updateElementStyle } from "controllers/app";

type State = {
    position: {
        x: number;
        y: number;
    };
    color: string;
    blur: string;
    opacity: string;
};

type RGB = {
    r:number;
    g:number;
    b:number;
};

export class TextShadow extends Component<State>{
    private backdrop:HTMLElement;
    private blurInput:HTMLInputElement;
    private opacityInput:HTMLInputElement;

    constructor(){
        super();
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

    private handleBackdropClick:EventListener = () => {
        this.disable();
    }

    public disable(){
        if (this.backdrop){
            this.backdrop.remove();
        }
        this.style.visibility = "hidden";
    }

    public enable(){
        if (this.backdrop){
            this.backdrop.remove();
        }
        this.style.visibility = "visible";
        this.backdrop = document.createElement("text-shadow-backdrop");
        this.backdrop.addEventListener("click", this.handleBackdropClick);
        this.insertAdjacentElement("beforebegin", this.backdrop);
    }

    public updateColor(color:string){
        this.setState({color: color});
    }

    public updateBlur(blur:string){
        this.setState({blur: blur});
    }

    public updatePosition(x:number, y:number){
        this.setState({position: {
            x: x,
            y: y,
        }});
    }

    private handleBlur:EventListener = () => {
        this.setState({blur: this.blurInput.value});
    }

    private handleOpacity:EventListener = () => {
        this.setState({opacity: this.opacityInput.value});
    }

    private hexToRgb(hex:string):RGB {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    updated(){
        const rgb = this.hexToRgb(this.state.color);
        updateElementStyle(this.dataset.lookup, "textShadow", `${this.state.position.x}px ${this.state.position.y}px ${this.state.blur}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.state.opacity})`);
    }

    connectedCallback(){
        mount("color-picker", ColorPicker);
        mount("shadow-position", ShadowPosition);
        this.blurInput.addEventListener("change", this.handleBlur);
        this.opacityInput.addEventListener("change", this.handleOpacity);
    }
}