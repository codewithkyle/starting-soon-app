import { updateElementStyle } from "./app.mjs";
import { Component } from "./component.mjs";
import { render, html } from "./lit-html.mjs";
import { getLocalFonts } from "./fonts.mjs";
export class FontSelect extends Component {
    constructor() {
        super();
        this.selectFont = (e) => {
            const target = e.currentTarget;
            this.setState({ activeFontIndex: parseInt(target.dataset.index) });
            updateElementStyle(this.dataset.lookup, "fontFamily", target.dataset.fontFamily);
        };
        this.handleBackdropClick = () => {
            this.disable();
        };
        this.state = {
            fontFamilies: [],
            activeFontIndex: null,
        };
    }
    async loadFonts() {
        const fonts = await getLocalFonts();
        this.setState({ fontFamilies: fonts });
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
    connected() {
        this.loadFonts();
    }
    render() {
        let view = null;
        if (this.state.fontFamilies.length) {
            view = html `${this.state.fontFamilies.map((font, index) => {
                return html `<button title="${font}" class="${this.state.activeFontIndex === index ? "active" : ""}" data-font-family="${font}" data-index="${index}" @click=${this.selectFont}>${font}</button>`;
            })}`;
        }
        render(view, this);
    }
}
