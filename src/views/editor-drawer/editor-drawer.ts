export class EditorDrawer extends HTMLElement{
    public toggle(){
        if (this.getAttribute("state") === "closed"){
            this.setAttribute("state", "open");
            document.documentElement.setAttribute("editor", "open");
            document.title = "✏️ Editor";
        }else{
            this.setAttribute("state", "closed");
            document.documentElement.setAttribute("editor", "closed");
            document.title = "Starting Soon";
        }
    }
}
