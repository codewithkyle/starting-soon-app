export class TimerComponet extends HTMLElement {
    constructor() {
        super();
        this.handleInput = () => {
            if (!this.input.value.trim()) {
                this.input.value = "00:00:00";
            }
            // @ts-ignore
            let values = this.input.value.replace(/\s/g, "").split(":");
            let inSeconds = 0;
            this.input.value = "";
            for (let i = 0; i < values.length; i++) {
                // @ts-ignore
                values[i] = parseInt(values[i]);
                if (values[i] > 59) {
                    values[i] = 59;
                }
                if (values[i] === 0) {
                    this.input.value += "00";
                }
                else if (values[i] < 10) {
                    this.input.value += `0${values[i]}`;
                }
                else {
                    this.input.value += `${values[i]}`;
                }
                if (i < values.length - 1) {
                    this.input.value += ":";
                }
            }
            switch (values.length) {
                case 1:
                    inSeconds = values[0];
                    break;
                case 2:
                    inSeconds = (values[0] * 60) + values[1];
                    break;
                default:
                    inSeconds = (values[0] * 3600) + (values[1] * 60) + values[2];
                    break;
            }
            // @ts-ignore
            this.parentElement.updateTime(inSeconds);
        };
        this.input = this.querySelector("input");
    }
    connectedCallback() {
        this.input.addEventListener("blur", this.handleInput);
    }
}
