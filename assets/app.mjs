import { mount } from "./mount.mjs";
import { DynamicBackground } from "./dynamic-background.mjs";
import { SponsorCarousel } from "./sponsor-carousel.mjs";
import { TimerView } from "./timer-view.mjs";
mount("dynamic-background", DynamicBackground);
mount("sponsor-carousel", SponsorCarousel);
mount("timer-view", TimerView);
class Application {
    constructor() {
        this.sponsorCarousel = document.body.querySelector("sponsor-carousel");
        this.background = document.body.querySelector("dynamic-background");
        this.timer = document.body.querySelector("timer-view");
    }
    toggleEditor() {
        if (document.documentElement.getAttribute("editor") === "open") {
            document.documentElement.setAttribute("editor", "closed");
            document.title = "Starting Soon";
            // @ts-ignore
            document.body.querySelectorAll("text-shadow").forEach(el => el.disable());
            // @ts-ignore
            document.body.querySelectorAll("font-select").forEach(el => el.disable());
        }
        else {
            document.documentElement.setAttribute("editor", "open");
            document.title = "✏️ Editor";
        }
    }
    loadBackgroundImage(url) {
        this.background.loadImage(url);
    }
    setBackgroundColor(hex) {
        this.background.setColor(hex);
    }
    loadBackgroundVideo(url) {
        const videoID = url.trim().replace(/.*\?v\=/, "").replace(/\&.*/, "");
        this.background.loadVideo(videoID);
    }
    setTintColor(hex) {
        this.background.setTint(hex);
    }
    setTintOpacity(value) {
        this.background.setTintOpacity(value);
    }
    setBackgroundBlur(value) {
        this.background.setBlur(value);
    }
    lookupElement(className) {
        const el = document.body.querySelector(`.${className}`);
        return el;
    }
    updateElementStyle(className, key, value) {
        const el = this.lookupElement(className);
        if (el) {
            el.style[key] = value;
        }
    }
    updateText(className, value) {
        const el = this.lookupElement(className);
        if (el) {
            el.innerText = value;
        }
    }
    loadSponsorLogos(images) {
        this.sponsorCarousel.renderImages(images);
    }
    setCarouselSpeed(value) {
        this.sponsorCarousel.setSpeed(value);
    }
    setTimer(seconds) {
        this.timer.setTime(seconds);
    }
    toggleTimerCountdown() {
        this.timer.toggle();
    }
}
const app = new Application();
const toggleEditor = app.toggleEditor.bind(app);
const loadBackgroundImage = app.loadBackgroundImage.bind(app);
const setBackgroundColor = app.setBackgroundColor.bind(app);
const loadBackgroundVideo = app.loadBackgroundVideo.bind(app);
const setTintColor = app.setTintColor.bind(app);
const setTintOpacity = app.setTintOpacity.bind(app);
const setBackgroundBlur = app.setBackgroundBlur.bind(app);
const updateElementStyle = app.updateElementStyle.bind(app);
const updateText = app.updateText.bind(app);
const loadSponsorLogos = app.loadSponsorLogos.bind(app);
const setCarouselSpeed = app.setCarouselSpeed.bind(app);
const setTimer = app.setTimer.bind(app);
const toggleTimerCountdown = app.toggleTimerCountdown.bind(app);
export { toggleEditor, loadBackgroundImage, setBackgroundColor, loadBackgroundVideo, setTintColor, setTintOpacity, setBackgroundBlur, updateElementStyle, updateText, loadSponsorLogos, setCarouselSpeed, setTimer, toggleTimerCountdown };
