import { toggleEditor } from "./app.mjs";
export default class ToggleDrawerButton extends HTMLElement {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            toggleEditor();
        };
    }
    connectedCallback() {
        this.addEventListener("click", this.handleClick);
    }
}
