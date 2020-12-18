export class ShadowPosition extends HTMLElement {
    constructor() {
        super();
        this.handleMouseDown = (e) => {
            this.moving = true;
            if (e instanceof MouseEvent) {
                this.pos3 = e.clientX;
                this.pos4 = e.clientY;
            }
            else if (e instanceof TouchEvent) {
                this.pos3 = e.touches[0].clientX;
                this.pos4 = e.touches[0].clientY;
            }
        };
        this.handleMouseUp = () => {
            this.moving = false;
        };
        this.handleMouseMove = (e) => {
            if (this.moving) {
                if (e instanceof MouseEvent) {
                    this.pos1 = this.pos3 - e.clientX;
                    this.pos2 = this.pos4 - e.clientY;
                    this.pos3 = e.clientX;
                    this.pos4 = e.clientY;
                }
                else if (e instanceof TouchEvent) {
                    this.pos1 = this.pos3 - e.touches[0].clientX;
                    this.pos2 = this.pos4 - e.touches[0].clientY;
                    this.pos3 = e.touches[0].clientX;
                    this.pos4 = e.touches[0].clientY;
                }
                let top = parseInt(this.handle.dataset.top) - this.pos2;
                if (top < 0) {
                    top = 0;
                }
                else if (top > 36) {
                    top = 36;
                }
                let left = parseInt(this.handle.dataset.left) - this.pos1;
                if (left < 0) {
                    left = 0;
                }
                else if (left > 36) {
                    left = 36;
                }
                this.handle.style.transform = `translate(${left}px, ${top}px)`;
                this.handle.dataset.top = `${top}`;
                this.handle.dataset.left = `${left}`;
                // @ts-ignore
                this.parentElement.updatePosition(((left - 18) / 2), ((top - 18) / 2));
            }
        };
        this.handle = this.querySelector("i");
        this.moving = false;
        this.pos1 = 0;
        this.pos2 = 0;
        this.pos3 = 0;
        this.pos4 = 0;
    }
    connectedCallback() {
        this.addEventListener("mousedown", this.handleMouseDown);
        window.addEventListener("mouseup", this.handleMouseUp);
        window.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("mouseleave", this.handleMouseMove);
        window.addEventListener("mouseout", this.handleMouseMove);
        this.addEventListener("touchstart", this.handleMouseDown);
        window.addEventListener("touchend", this.handleMouseUp);
        window.addEventListener("touchmove", this.handleMouseMove);
        window.addEventListener("touchcancel", this.handleMouseMove);
    }
}
