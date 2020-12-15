import { Component } from "djinnjs/component";
import { fetchCSS } from "djinnjs/fetch";
import { html, render } from "lit-html";
import { setBackgroundColor, loadBackgroundVideo } from "../../app";

import { BackgroundImageButton } from "./background-image-button/background-image-button";
customElements.define("background-image-button", BackgroundImageButton);

import { ColorComponent } from "../../color-component/color-component";
customElements.define("color-component", ColorComponent);

type State = {
    background: string;
}

export default class BackgroundSettings extends Component<State>{
    private container:HTMLElement;
    private select:HTMLSelectElement;

    constructor(){
        super();

        fetchCSS(["url-component", "color-component", "select-component"]);

        this.container = this.querySelector(".js-container");
        this.select = this.querySelector(".js-background-select");

        this.state = {
            background: "light",
        };
    }

    private updateColor(color:string){
        setBackgroundColor(color);
    }

    private handleYoutubeVideo(url:string){
        if (url.length){
            const videoID = url.trim().replace(/.*\?v\=/, "").replace(/\&.*/, "");
            loadBackgroundVideo(videoID);
        }
    }

    private switchBackground:EventListener = () => {
        switch(this.select.value){
            case "light":
                setBackgroundColor("var(--grey-100)");
                break;
            case "dark":
                setBackgroundColor("var(--neutral-900)");
                break;
            default:
                setBackgroundColor("var(--grey-100)");
                break;
        }
        this.setState({
            background: this.select.value,
        });
    }

    connected(){
        this.select.addEventListener("change", this.switchBackground);
    }

    render(){
        let view;
        switch(this.state.background){
            case "video":
                view = html`
                    <url-component>
                        <label for="youtube-video-url">YouTube Video</label>
                        <input placeholder="https://www.youtube.com/watch?v=Kljpa--hbz4" @input=${e => this.handleYoutubeVideo(e.currentTarget.value)} type="url" id="youtube-video-url" name="youtube-video-url" required />
                    </url-component>
                `;
                break;
            case "custom":
                setBackgroundColor("#000");
                view = html`
                    <color-component>
                        <input @change=${e => this.updateColor(e.currentTarget.value)} id="custom-background-color" type="color" />
                        <label for="custom-background-color"></label>
                        <input @blur=${e => this.updateColor(e.currentTarget.value)} type="text" value="#000000">
                    </color-component>
                `;
                break;
            case "image":
                view = html`
                    <background-image-button role="button" tabindex="0" class="block">
                        <input style="opacity: 0;visibility: hidden;position: absolute;" id="background-upload" type="file" accept="image/*">
                        <label for="background-upload" class="button -solid -primary -rounded w-full">
                            Upload background image
                        </label>
                    </background-image-button>
                `;
                break;
            default:
                view = null;
                break;
        }
        render(view, this.container);
    }
}