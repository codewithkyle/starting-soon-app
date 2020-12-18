export class DynamicBackground extends HTMLElement {
    constructor() {
        super();
        this.image = null;
        this.video = null;
        this.tint = null;
    }
    reset() {
        if (this.image) {
            this.image.remove();
            this.image = null;
        }
        if (this.video) {
            this.video.remove();
            this.video = null;
        }
        if (this.tint) {
            this.tint.remove();
            this.tint = null;
        }
    }
    loadImage(url) {
        this.reset();
        this.image = document.createElement("img");
        this.image.src = url;
        this.image.draggable = false;
        this.appendChild(this.image);
    }
    setColor(value) {
        this.reset();
        this.style.backgroundColor = value;
    }
    onPlayerReady(event) {
        event.target.mute();
        event.target.playVideo();
        event.target.setLoop(true);
        this.video = this.querySelector("iframe");
    }
    handlePlayerChange(event) {
        if (event.data === 0) {
            event.target.playVideo();
        }
    }
    loadVideo(videoID) {
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
    setTint(hex) {
        if (!this.tint) {
            this.tint = document.createElement("div");
            this.tint.className = "tint";
            this.tint.style.opacity = "0";
            this.appendChild(this.tint);
        }
        this.tint.style.backgroundColor = hex;
    }
    setTintOpacity(value) {
        if (!this.tint) {
            this.tint = document.createElement("div");
            this.tint.className = "tint";
            this.tint.style.backgroundColor = "#000";
            this.appendChild(this.tint);
        }
        this.tint.style.opacity = value;
    }
    setBlur(value) {
        const int = parseInt(value);
        let el = null;
        if (this.video) {
            el = this.video;
        }
        else if (this.image) {
            el = this.image;
        }
        if (el) {
            el.style.filter = `blur(${int}px)`;
            el.style.width = `calc(100% + ${int * 4}px)`;
            el.style.height = `calc(100% + ${int * 4}px)`;
            el.style.top = `-${int * 2}px`;
            el.style.left = `-${int * 2}px`;
        }
    }
}
