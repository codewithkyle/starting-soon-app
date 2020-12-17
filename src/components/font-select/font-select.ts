import { updateElementStyle } from "controllers/app";
import { Component } from "djinnjs/component";
import { render, html } from "lit-html";
import { getLocalFonts } from "utils/fonts";

type State = {
    fontFamilies: Array<string>;
    activeFontIndex: number;
};

export class FontSelect extends Component<State>{
    private backdrop:HTMLElement;

    constructor(){
        super();
        this.state = {
            fontFamilies: [],
            activeFontIndex: null,
        };
    }

    private async loadFonts(){
        const fonts = await getLocalFonts();
        this.setState({fontFamilies: fonts});
    }

    private selectFont:EventListener = (e:Event) => {
        const target = e.currentTarget as HTMLElement;
        this.setState({activeFontIndex: parseInt(target.dataset.index)});
        updateElementStyle(this.dataset.lookup, "fontFamily", target.dataset.fontFamily);
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

    connected(){
        this.loadFonts();
    }

    render(){
        let view = null;
        if (this.state.fontFamilies.length){
            view = html`${this.state.fontFamilies.map((font, index) => {
                return html`<button title="${font}" class="${this.state.activeFontIndex === index ? "active" : ""}" data-font-family="${font}" data-index="${index}" @click=${this.selectFont}>${font}</button>`;
            })}`;
        }
        render(view, this);
    }
}