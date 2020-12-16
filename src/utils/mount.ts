export function mount(tagName:string, className:CustomElementConstructor):void{
    if (!customElements.get(tagName)){
        customElements.define(tagName, className);
    }
}