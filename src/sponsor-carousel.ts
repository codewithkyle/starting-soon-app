export default class SponsorCarousel extends HTMLElement{
    private container: HTMLElement;

    constructor(){
        super();
        this.container = this.querySelector("image-carousel");
    }

    public renderImages(images:Array<HTMLImageElement>):void{
        this.container.innerHTML = "";
        for (let i = 0; i < images.length; i++){
            this.container.appendChild(images[i]);
        }
        if (this.container.scrollWidth <= window.innerWidth){
            this.container.classList.add("text-center");
        }
    }
}
