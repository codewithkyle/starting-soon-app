export function mount(tagName, className) {
    if (!customElements.get(tagName)) {
        customElements.define(tagName, className);
    }
}
