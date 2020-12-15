import { BackgroundComponent } from "./background-component/background-component";
customElements.define("background-component", BackgroundComponent);

import { EditorDrawer } from "./editor-drawer/editor-drawer";
customElements.define("editor-drawer", EditorDrawer);

class Application{
    private heading:HTMLElement;
    private subheading:HTMLElement;
    private sponsorCarousel:HTMLElement;
    private editor:EditorDrawer;
    private background:BackgroundComponent;

    constructor(){
        this.heading = document.body.querySelector(".js-heading");
        this.subheading = document.body.querySelector(".js-subheading");
        this.sponsorCarousel = document.body.querySelector("sponsor-carousel");
        this.editor = document.body.querySelector("editor-drawer");
        this.background = document.body.querySelector("background-component");
    }

    public toggleEditor(){
        this.editor.toggle();
    }

    public loadBackgroundImage(url:string){
        this.background.loadImage(url);
    }

    public setBackgroundColor(hex:string){
        this.background.setColor(hex);
    }

    public loadBackgroundVideo(url:string){
        const videoID = url.trim().replace(/.*\?v\=/, "").replace(/\&.*/, "");
        this.background.loadVideo(videoID);
    }

    public setTintColor(hex:string){
        this.background.setTint(hex);
    }

    public setTintOpacity(value:string){
        this.background.setTintOpacity(value);
    }
}

const app = new Application();

const toggleEditor:Function = app.toggleEditor.bind(app);
const loadBackgroundImage:(url:string)=>void = app.loadBackgroundImage.bind(app);
const setBackgroundColor:(hex:string)=>void = app.setBackgroundColor.bind(app);
const loadBackgroundVideo:(videoID:string)=>void = app.loadBackgroundVideo.bind(app);
const setTintColor:(hex:string)=>void = app.setTintColor.bind(app);
const setTintOpacity:(value:string)=>void = app.setTintOpacity.bind(app);

export { toggleEditor, loadBackgroundImage, setBackgroundColor, loadBackgroundVideo, setTintColor, setTintOpacity };