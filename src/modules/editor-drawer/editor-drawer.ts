export class EditorDrawer extends HTMLElement{
    public toggle(){
        if (this.getAttribute("state") === "closed"){
            this.setAttribute("state", "open");
        }else{
            this.setAttribute("state", "closed");
        }
    }
}
