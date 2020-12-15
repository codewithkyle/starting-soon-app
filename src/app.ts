class Application{
    private heading:HTMLElement;
    private subheading:HTMLElement;
    private sponsorCarousel:HTMLElement;
    private editor:HTMLElement;

    constructor(){
        this.heading = document.body.querySelector(".js-heading");
        this.subheading = document.body.querySelector(".js-subheading");
        this.sponsorCarousel = document.body.querySelector("sponsor-carousel");
        this.editor = document.body.querySelector("editor-drawer");
    }

    public toggleEditor(){
        // @ts-ignore
        this.editor.toggle();
    }
}

const app = new Application();

const toggleEditor:Function = app.toggleEditor.bind(app);

export { toggleEditor };