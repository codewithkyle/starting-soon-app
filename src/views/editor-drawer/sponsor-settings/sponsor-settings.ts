import { setCarouselSpeed, updateElementStyle } from "controllers/app";
import { Component } from "djinnjs/component";
import { fetchCSS } from "djinnjs/fetch";
import { html, render } from "lit-html";

import { SponsorUploadButton } from "./sponsor-upload-button/sponsor-upload-button";
customElements.define("sponsor-upload-button", SponsorUploadButton);

type State = {
    visible: boolean;
};

export default class SponsorSettings extends Component<State>{
    private visibilityButton:HTMLButtonElement;
    private container:HTMLElement;

    constructor(){
        super();

        this.visibilityButton = this.querySelector(".js-toggle-sponsor-view");
        this.container = this.querySelector(".js-container");

        this.state = {
            visible: false,
        };

        fetchCSS(["sponsor-settings", "sponsor-upload-button", "copy-editor"]);
    }

    private toggleVisibility:EventListener = () => {
        this.setState({visible: this.state.visible ? false : true});
    }

    private updateCarouselSpeed(value:string){
        setCarouselSpeed(parseInt(value));
    }

    updated(){
        updateElementStyle("js-sponsor-carousel", "display", `${this.state.visible ? "block" : "none"}`);
    }

    connected(){
        this.visibilityButton.addEventListener("click", this.toggleVisibility);
    }

    render(){
        this.visibilityButton.setAttribute("state", `${this.state.visible ? "visible" : "hidden"}`);
        let view = null;
        if (this.state.visible){
            view = html`
                <sponsor-upload-button class="mb-1">
                    <input id="sponsor-upload" type="file" multiple accept="image/*">
                    <label for="sponsor-upload" class="button -solid -primary -icon w-full">
                        <i class="icon">
                            <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"></path></svg>
                        </i>
                        Add sponsor logos
                    </label>
                </sponsor-upload-button>
                <range-component class="mb-1">
                    <label for="carousel-speed">Carousel Speed</label>
                    <input @change=${e => this.updateCarouselSpeed(e.currentTarget.value)} type="range" id="carousel-speed" min="1" max="100" step="1" value="100">
                </range-component>
                <copy-editor loading="eager" class="mb-2" data-lookup="js-sponsor-label">
                    <textarea-component web-component css="textarea-component">
                        <label for="sponsor-label-textarea-component" class="block w-full mb-1">Sponsor Label</label>
                        <textarea id="sponsor-label-textarea-component" rows="5" style="margin-right: 36px;width: calc(100% - 36px);border-radius: 0.25rem 0 0 0.25rem;">Sponsored by</textarea>
                    </textarea-component>
                    <copy-editor-actions>
                        <button state="hidden" class="js-toggle-visiblity-button visibility" aria-label="enable heading" tooltip="Enable">
                            <svg class="hidden" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"></path></svg>
                            <svg class="visible" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg>
                        </button>
                        <button state="regular" class="js-toggle-bold-button weight" aria-label="bold heading" tooltip="Bold">
                            <svg class="bold" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M333.49 238a122 122 0 0 0 27-65.21C367.87 96.49 308 32 233.42 32H34a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h31.87v288H34a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h209.32c70.8 0 134.14-51.75 141-122.4 4.74-48.45-16.39-92.06-50.83-119.6zM145.66 112h87.76a48 48 0 0 1 0 96h-87.76zm87.76 288h-87.76V288h87.76a56 56 0 0 1 0 112z"></path></svg>
                            <svg class="regular" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M306 234.12c27.74-20.38 46-53.01 46-90.12A112 112 0 0 0 240 32H40a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h24v384H40a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h216a128 128 0 0 0 50-245.88zM96 64h144a80 80 0 0 1 0 160H96zm160 384H96V256h160a96 96 0 0 1 0 192z"></path></svg>
                        </button>
                        <div>
                            <label class="color" for="sponsor-label-color-input" aria-label="subheading color" tooltip="Font color">
                                <i class="js-color-input-icon" style="background-color: #000;"></i>
                            </label>
                            <input style="opacity: 0;visibility: hidden;position: absolute;" type="color" id="sponsor-label-color-input" class="js-color-input">
                        </div>
                        <button class="js-enlarge-text-button" aria-label="Increase font size" tooltip>
                            <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"></path></svg>
                        </button>
                        <button class="js-shrink-text-button" aria-label="Decrease font size" tooltip>
                            <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M376 232H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h368c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"></path></svg>
                        </button>
                    </copy-editor-actions>
                </copy-editor>
            `;
        }
        render(view, this.container);
    }
}