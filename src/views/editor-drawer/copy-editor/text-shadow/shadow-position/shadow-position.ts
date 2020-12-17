export class ShadowPosition extends HTMLElement{
    private handle:HTMLElement;
    private moving:boolean;
    private pos1:number;
    private pos2:number;
    private pos3:number;
    private pos4:number;

    constructor(){
        super();
        this.handle = this.querySelector("i");
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

            let top = parseInt(this.handle.dataset.top) - this.pos2;
            if (top < 0){
                top = 0;
            } else if (top > 36){
                top = 36;
            }

            let left = parseInt(this.handle.dataset.left) - this.pos1;
            if (left < 0){
                left = 0;
            } else if (left > 36){
                left = 36;
            }
            

            this.handle.style.transform = `translate(${left}px, ${top}px)`;
            this.handle.dataset.top = `${top}`;
            this.handle.dataset.left = `${left}`;

            // @ts-ignore
            this.parentElement.updatePosition(((left - 18) / 2), ((top - 18) / 2));
        }
    }

    connectedCallback(){
        this.addEventListener("mousedown", this.handleMouseDown);
        document.body.addEventListener("mouseup", this.handleMouseUp);
        document.body.addEventListener("mousemove", this.handleMouseMove);
    }
}