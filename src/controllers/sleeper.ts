class Sleeper{
    private countdown: number;
    private time: number;

    constructor(){
        this.countdown = 10;
        window.addEventListener("mousemove", this.captureInteraction, {passive: true});
        window.addEventListener("touchstart", this.captureInteraction, {passive: true});
        window.addEventListener("scroll", this.captureInteraction, {passive: true});
        window.addEventListener("keyup", this.captureInteraction, {passive: true});
        this.time = performance.now();
        this.loop();
    }

    private captureInteraction:EventListener = ()=>{
        document.documentElement.setAttribute("state", "awake");
        if (document.documentElement.getAttribute("editor") === "open"){
            document.title = "✏️ Editor";
        } else {
            document.title = "Starting Soon";
        }
        this.countdown = 10;
    }

    private loop(){
        const newTime = performance.now();
        const deltaTime = (newTime - this.time) / 1000;
        this.time = newTime;
        this.countdown -= deltaTime;
        if (this.countdown <= 0){
            if (document.documentElement.getAttribute("state") === "awake"){
                document.documentElement.setAttribute("state", "asleep");
                document.title = "🔴 Live";
                this.countdown = 1;
            } else {
                if (document.title === "🔴 Live"){
                    document.title = "⚫ Live";
                } else {
                    document.title = "🔴 Live";
                }
                this.countdown = 1;
            }
        }
        window.requestAnimationFrame(this.loop.bind(this));
    }
}
new Sleeper();