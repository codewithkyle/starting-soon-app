import { toggleEditor } from "./app.mjs";
export default class EditorBackdrop extends HTMLElement {
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
