export class BackgroundComponent extends HTMLElement{
    private image:HTMLImageElement;
    private video:HTMLElement;
    private tint:HTMLElement;

    constructor(){
        super();
        this.image = null;
        this.video = null;
        this.tint = null;
    }

    private reset(){
        if (this.image){
            this.image.remove();
            this.image = null;
        }
        if (this.video){
            this.video.remove();
            this.video = null;
        }
        if (this.tint){
            this.tint.remove();
            this.tint = null;
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
        event.target.setLoop(true);
        this.video = this.querySelector("iframe");
    }

    private handlePlayerChange(event){
        if (event.data === 0){
            event.target.playVideo();
        }
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
                "onReady": this.onPlayerReady.bind(this),
                "onStateChange": this.handlePlayerChange.bind(this)
              }
        });
    }

    public setTint(hex:string):void{
        if(!this.tint){
            this.tint = document.createElement("div");
            this.tint.className = "tint";
            this.tint.style.opacity = "0";
            this.appendChild(this.tint);
        }
        this.tint.style.backgroundColor = hex;
    }

    public setTintOpacity(value:string):void{
        if(!this.tint){
            this.tint = document.createElement("div");
            this.tint.className = "tint";
            this.tint.style.backgroundColor = "#000";
            this.appendChild(this.tint);
        }
        this.tint.style.opacity = value;
    }
}