import { toggleEditor } from "./app";

export default class ToggleDrawerButton extends HTMLElement{
    private handleClick:EventListener = () => {
        toggleEditor();
    }

    connectedCallback(){
        this.addEventListener("click", this.handleClick);
    }
}
