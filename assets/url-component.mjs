export class URLComponent extends HTMLElement {
    constructor() {
        super();
        this.handleBlur = () => {
            this.validate();
        };
        this.handleInput = this.clearError.bind(this);
        this.input = this.querySelector("input");
        this.textEl = this.querySelector("p");
        const errorEl = document.createElement("p");
        errorEl.className = "error";
        errorEl.style.display = "none";
        this.insertBefore(errorEl, this.input);
        this.errorEl = errorEl;
    }
    validate() {
        let isValid = true;
        if (this.input.required) {
            if (this.input.value === "") {
                isValid = false;
                if (this.getAttribute("state") !== "invalid") {
                    this.reportError("This field is required.");
                }
            }
            else {
                if (new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g).test(this.input.value)) {
                    this.clearError();
                }
                else {
                    isValid = false;
                    if (this.getAttribute("state") !== "invalid") {
                        this.reportError("Invalid URL format.");
                    }
                }
            }
        }
        else {
            this.clearError();
        }
        return isValid;
    }
    reportError(error) {
        this.errorEl.innerHTML = error;
        this.errorEl.style.display = "block";
        if (this.textEl) {
            this.textEl.style.display = "none";
        }
        this.setAttribute("state", "invalid");
    }
    clearError() {
        this.errorEl.style.display = "none";
        if (this.textEl) {
            this.textEl.style.display = "block";
        }
        this.setAttribute("state", "valid");
    }
    connectedCallback() {
        this.input.addEventListener("input", this.handleInput);
        this.input.addEventListener("blur", this.handleBlur);
    }
}
