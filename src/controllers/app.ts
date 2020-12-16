import { DynamicBackground } from "modules/dynamic-background/dynamic-background";
customElements.define("dynamic-background", DynamicBackground);

import { EditorDrawer } from "modules/editor-drawer/editor-drawer";
customElements.define("editor-drawer", EditorDrawer);

class Application{
    private sponsorCarousel:HTMLElement;
    private editor:EditorDrawer;
    private background:DynamicBackground;

    constructor(){
        this.sponsorCarousel = document.body.querySelector("sponsor-carousel");
        this.editor = document.body.querySelector("editor-drawer");
        this.background = document.body.querySelector("dynamic-background");
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

    public setBackgroundBlur(value:string){
        this.background.setBlur(value);
    }

    private lookupElement(className:string):HTMLElement{
        const el:HTMLElement = document.body.querySelector(`.${className}`);
        return el;
    }

    public updateElementStyle(className:string, key:string, value:string):void{
        const el = this.lookupElement(className);
        if (el){
            el.style[key] = value;
        }
    }

    public updateText(className:string, value:string):void{
        const el = this.lookupElement(className);
        if (el){
            el.innerText = value;
        }
    }
}

const app = new Application();

const toggleEditor:Function = app.toggleEditor.bind(app);
const loadBackgroundImage:(url:string)=>void = app.loadBackgroundImage.bind(app);
const setBackgroundColor:(hex:string)=>void = app.setBackgroundColor.bind(app);
const loadBackgroundVideo:(videoID:string)=>void = app.loadBackgroundVideo.bind(app);
const setTintColor:(hex:string)=>void = app.setTintColor.bind(app);
const setTintOpacity:(value:string)=>void = app.setTintOpacity.bind(app);
const setBackgroundBlur:(value:string)=>void = app.setBackgroundBlur.bind(app);
const updateElementStyle:(className:string, key:string, value:string)=>void = app.updateElementStyle.bind(app);
const updateText:(className:string, value:string)=>void = app.updateText.bind(app);

export { toggleEditor, loadBackgroundImage, setBackgroundColor, loadBackgroundVideo, setTintColor, setTintOpacity, setBackgroundBlur, updateElementStyle, updateText };
