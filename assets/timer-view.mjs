import { Draggable } from "./draggable.mjs";
export class TimerView extends Draggable {
    constructor() {
        super();
        this.running = false;
        this.countdown = 0;
        this.time = performance.now();
        this.date = new Date(0);
        this.loop();
    }
    toHHMMSS(value) {
        const sec_num = parseInt(value, 10);
        const hours = Math.floor(sec_num / 3600);
        const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        const seconds = sec_num - (hours * 3600) - (minutes * 60);
        return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    loop() {
        if (this.running) {
            const newTime = performance.now();
            const deltaTime = (newTime - this.time) / 1000;
            this.time = newTime;
            this.countdown -= deltaTime;
            if (this.countdown < 0) {
                this.countdown = 0;
            }
            this.innerText = this.toHHMMSS(`${Math.ceil(this.countdown)}`);
        }
        window.requestAnimationFrame(this.loop.bind(this));
    }
    toggle() {
        if (this.running) {
            this.running = false;
            this.countdown = this.countdownBase;
            this.innerText = this.toHHMMSS(`${Math.ceil(this.countdown)}`);
        }
        else {
            this.time = performance.now();
            this.countdown = this.countdownBase;
            this.running = true;
        }
    }
    setTime(seconds) {
        this.countdown = seconds;
        this.countdownBase = seconds;
        this.innerText = this.toHHMMSS(`${Math.ceil(this.countdown)}`);
    }
}
