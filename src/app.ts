class Application{
    private heading:HTMLElement;
    private subheading:HTMLElement;
    private sponsorCarousel:HTMLElement;
    private editor:HTMLElement;
    private background:HTMLElement;

    constructor(){
        this.heading = document.body.querySelector(".js-heading");
        this.subheading = document.body.querySelector(".js-subheading");
        this.sponsorCarousel = document.body.querySelector("sponsor-carousel");
        this.editor = document.body.querySelector("editor-drawer");
        this.background = document.body.querySelector("background-component");
    }

    public toggleEditor(){
        // @ts-expect-error
        this.editor.toggle();
    }

    public loadBackgroundImage(url:string){
        // @ts-expect-error
        this.background.loadImage(url);
    }

    public setBackgroundColor(hex:string){
        // @ts-expect-error
        this.background.setColor(hex);
    }

    public loadBackgroundVideo(videoID:string){
        // @ts-expect-error
        this.background.loadVideo(videoID);
    }
}

const app = new Application();

const toggleEditor:Function = app.toggleEditor.bind(app);
const loadBackgroundImage:(url:string)=>void = app.loadBackgroundImage.bind(app);
const setBackgroundColor:(hex:string)=>void = app.setBackgroundColor.bind(app);
const loadBackgroundVideo:(videoID:string)=>void = app.loadBackgroundVideo.bind(app);

export { toggleEditor, loadBackgroundImage, setBackgroundColor, loadBackgroundVideo };