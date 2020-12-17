import { toggleEditor } from "controllers/app";

export default class EditorBackdrop extends HTMLElement{
    private handleClick:EventListener = () => {
        toggleEditor();
    }

    connectedCallback(){
        this.addEventListener("click", this.handleClick);
    }
}