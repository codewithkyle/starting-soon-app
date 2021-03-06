import { mount } from "utils/mount";
import { DynamicBackground } from "views/dynamic-background/dynamic-background";
import { SponsorCarousel } from "views/sponsor-carousel/sponsor-carousel";
import { TimerView } from "views/timer-view/timer-view";

mount("dynamic-background", DynamicBackground);
mount("sponsor-carousel", SponsorCarousel);
mount("timer-view", TimerView);

class Application{
    private sponsorCarousel:SponsorCarousel;
    private background:DynamicBackground;
    private timer:TimerView;

    constructor(){
        this.sponsorCarousel = document.body.querySelector("sponsor-carousel");
        this.background = document.body.querySelector("dynamic-background");
        this.timer = document.body.querySelector("timer-view");
    }

    public toggleEditor(){
        if (document.documentElement.getAttribute("editor") === "open"){
            document.documentElement.setAttribute("editor", "closed");
            document.title = "Starting Soon";
            // @ts-ignore
            document.body.querySelectorAll("text-shadow").forEach(el => el.disable());
            // @ts-ignore
            document.body.querySelectorAll("font-select").forEach(el => el.disable());
        }else{
            document.documentElement.setAttribute("editor", "open");
            document.title = "✏️ Editor";
        }
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

    public loadSponsorLogos(images:Array<HTMLImageElement>){
        this.sponsorCarousel.renderImages(images);
    }

    public setCarouselSpeed(value:number){
        this.sponsorCarousel.setSpeed(value);
    }

    public setTimer(seconds:number){
        this.timer.setTime(seconds);
    }

    public toggleTimerCountdown(){
        this.timer.toggle();
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
const loadSponsorLogos:(images:Array<HTMLImageElement>)=>void = app.loadSponsorLogos.bind(app);
const setCarouselSpeed:(speed:number)=>void = app.setCarouselSpeed.bind(app);
const setTimer:(seconds:number)=>void = app.setTimer.bind(app);
const toggleTimerCountdown:Function = app.toggleTimerCountdown.bind(app);

export { toggleEditor, loadBackgroundImage, setBackgroundColor, loadBackgroundVideo, setTintColor, setTintOpacity, setBackgroundBlur, updateElementStyle, updateText, loadSponsorLogos, setCarouselSpeed, setTimer, toggleTimerCountdown };
