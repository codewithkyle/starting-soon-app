export default class BackgroundComponent extends HTMLElement{
    private image:HTMLImageElement;
    private video:HTMLElement;

    constructor(){
        super();
        this.image = null;
        this.video = null;
    }

    private reset(){
        if (this.image){
            this.image.remove();
        }
        if (this.video){
            this.video.remove();
        }
    }

    public loadImage(url:string):void{
        this.reset();
        this.image = document.createElement("img");
        this.image.src = url;
        this.image.draggable = false;
        this.appendChild(this.image);
    }

    public setColor(value:string):void{
        this.reset();
        this.style.backgroundColor = value;
    }

    private onPlayerReady(event){
        event.target.mute();
        event.target.playVideo();
        this.video = this.querySelector("iframe");
    }

    public loadVideo(videoID:string):void{
        this.reset();
        this.video = document.createElement("div");
        this.video.id = "player";
        this.appendChild(this.video);

        // @ts-ignore
        new YT.Player("player", {
            width: window.innerWidth,
            videoId: videoID,
            playerVars: {
                "autoplay": 1,
                "controls": 0,
                "showinfo": 0,
                "loop": 1,
                "disablekb": 1,
            },
            events: {
                'onReady': this.onPlayerReady.bind(this),
              }
        });
    }
}