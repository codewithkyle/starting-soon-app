export default class FullscreenButton extends HTMLElement {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            if (this.getAttribute("state") === "fullscreen") {
                this.setAttribute("state", "not-fullscreen");
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                // @ts-ignore
                else if (document.mozCancelFullScreen) {
                    // @ts-ignore
                    document.mozCancelFullScreen();
                }
                // @ts-ignore
                else if (document.webkitCancelFullScreen) {
                    // @ts-ignore
                    document.webkitCancelFullScreen();
                }
                // @ts-ignore
                else if (document.msExitFullscreen) {
                    // @ts-ignore
                    document.msExitFullscreen();
                }
            }
            else {
                this.setAttribute("state", "fullscreen");
                var docElm = document.documentElement;
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                }
                // @ts-ignore
                else if (docElm.mozRequestFullScreen) {
                    // @ts-ignore
                    docElm.mozRequestFullScreen();
                }
                // @ts-ignore
                else if (docElm.webkitRequestFullScreen) {
                    // @ts-ignore
                    docElm.webkitRequestFullScreen();
                }
                // @ts-ignore
                else if (docElm.msRequestFullscreen) {
                    // @ts-ignore
                    docElm.msRequestFullscreen();
                }
            }
        };
        this.handleFullscreen = () => {
            const isFullscreen = window.innerHeight == screen.height;
            if (!isFullscreen) {
                this.setAttribute("state", "not-fullscreen");
            }
        };
    }
    connectedCallback() {
        this.addEventListener("click", this.handleClick);
        document.addEventListener("fullscreenchange", this.handleFullscreen);
        document.addEventListener("mozfullscreenchange", this.handleFullscreen);
        document.addEventListener("webkitfullscreenchange", this.handleFullscreen);
        document.addEventListener("msfullscreenchange", this.handleFullscreen);
    }
}
