export class SponsorCarousel extends HTMLElement{
    private container: HTMLElement;
    private images:Array<HTMLImageElement>;
    private time:number;
    private speedModifier:number;
    private width:number;
    private running:boolean;

    constructor(){
        super();
        this.container = this.querySelector("image-carousel");
        this.images = [];
        this.speedModifier = 100;
        this.width = window.innerWidth;
        this.running = false;
    }

    private getBiggestOffset():number{
        let biggestOffset = 0;
        for (let i = 0; i < this.images.length; i++){
            const offset = parseFloat(this.images[i].dataset.offset);
            if (offset > biggestOffset){
                biggestOffset = offset;
            }
        }
        return biggestOffset;
    }

    private loop(){
        if (!this.running){
            return;
        }
        const newTime = performance.now();
        const deltaTime = (newTime - this.time) / 1000;
        this.time = newTime;

        for (let i = 0; i < this.images.length; i++){
            let offset = parseFloat(this.images[i].dataset.offset);
            offset = offset - (deltaTime * this.speedModifier);
            if (offset <= -364){
                const biggestOffset = this.getBiggestOffset();
                offset = biggestOffset + 364;
            }
            this.images[i].dataset.offset = `${offset}`;
            this.images[i].style.transform = `translateX(${offset}px)`;
        }

        window.requestAnimationFrame(this.loop.bind(this));
    }

    public renderImages(images:Array<HTMLImageElement>):void{
        this.container.innerHTML = "";
        const fullWidth = images.length * 364;
        if (fullWidth <= window.innerWidth + 64){
            for (let i = 0; i < images.length; i++){
                images[i].style.position = "relative";
                images[i].style.left = "auto";
                images[i].style.transform = "none";
                images[i].style.margin = "0 32px";
                this.container.appendChild(images[i]);
            }
            this.container.classList.remove("force-fit");
            this.running = false;
        }else{
            if (fullWidth < window.innerWidth + 364){
                for (let i = 0; i < images.length; i++){
                    images[i].style.position = "relative";
                    images[i].style.left = "auto";
                    images[i].style.transform = "none";
                    this.container.appendChild(images[i]);
                }
                this.container.classList.add("force-fit");
                this.running = false;
            } else {
                for (let i = 0; i < images.length; i++){
                    const offset = i * 364;
                    images[i].style.position = "absolute";
                    images[i].style.left = "0";
                    images[i].style.transform = `translateX(${offset}px)`;
                    images[i].dataset.offset = `${offset}`;
                    images[i].style.margin = "0 32px";
                    this.container.appendChild(images[i]);
                }
                this.container.classList.remove("force-fit");
                this.running = true;
                this.time = performance.now();
                this.loop();
            }
        }
        this.images = images;
    }

    public setSpeed(value:number){
        this.speedModifier = value;
    }

    private handleResize:EventListener = () => {
        if (this.width !== window.innerWidth){
            this.width = window.innerWidth;
            this.renderImages(this.images);
        }
    }

    connectedCallback(){

        window.addEventListener("resize", this.handleResize);
    }
}
