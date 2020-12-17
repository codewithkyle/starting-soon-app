export class Draggable extends HTMLElement{
    private moving:boolean;
    private pos1:number;
    private pos2:number;
    private pos3:number;
    private pos4:number;

    constructor(){
        super();
        this.moving = false;
        this.pos1 = 0;
        this.pos2 = 0;
        this.pos3 = 0;
        this.pos4 = 0;
    }

    private handleMouseDown:EventListener = (e:MouseEvent) => {
        this.moving = true;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
    }

    private handleMouseUp:EventListener = () => {
        this.moving = false;
    }

    private handleMouseMove:EventListener = (e:MouseEvent) => {
        if (this.moving){
            this.pos1 = this.pos3 - e.clientX;
            this.pos2 = this.pos4 - e.clientY;
            this.pos3 = e.clientX;
            this.pos4 = e.clientY;

            let top = parseInt(this.dataset.top) - this.pos2;

            const topLimit = (window.innerHeight / 2) * -1;
            const bottomLimit = (window.innerHeight / 2);
            const bounds = this.getBoundingClientRect();
            const halfHeight = bounds.height / 2;
            if (top - halfHeight < topLimit){
                top = topLimit + halfHeight;
            }
            if (top + halfHeight > bottomLimit){
                top = bottomLimit - halfHeight;
            }

            // let left = parseInt(this.dataset.left) - this.pos1;

            this.style.transform = `translateY(${top}px)`;
            this.dataset.top = `${top}`;
            // this.dataset.left = `${left}`;
        }
    }

    connectedCallback(){
        this.addEventListener("mousedown", this.handleMouseDown);
        window.addEventListener("mouseup", this.handleMouseUp);
        window.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("mouseleave", this.handleMouseMove);
        window.addEventListener("mouseout", this.handleMouseMove);
        this.dataset.top = "0";
        this.dataset.left = "0";
    }
}