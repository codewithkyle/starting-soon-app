const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const base = path.join(cwd, "src", "base.html");
if (!fs.existsSync(base)){
    console.error("Missing base file: ", base);
    process.exit(1);
}

let html = fs.readFileSync(base).toString();
let dom = new JSDOM(html);
dom = resolveIncludes(dom.window.document.documentElement, path.join(cwd, "src"));
removeIncludes(dom);
html = dom.outerHTML;

const public = path.join(cwd, "public", "index.html");
if (fs.existsSync(public)){
    fs.unlinkSync(public);
}
fs.writeFileSync(public, html);
process.exit(0);

function removeIncludes(element){
    const elements = Array.from(element.querySelectorAll("include"));
    for (let i = 0; i < elements.length; i++){
        elements[i].remove();
    }
}

function resolveIncludes(element, activeDir){
    const includeElements = Array.from(element.querySelectorAll("include"));
    for (let i = 0; i < includeElements.length; i++){
        let localPath = path.resolve(activeDir, includeElements[i].getAttribute("src"));
        if (localPath){
            if (new RegExp(/(\.html)$/).test(localPath)){
                localPath = path.resolve(activeDir, localPath);
            } else {
                localPath = path.resolve(activeDir, localPath, "index.html");
            }
            if (fs.existsSync(localPath)){
                const newActivePath = path.resolve(activeDir, `${localPath.replace(/(?!.*[\/\\]).*/, "")}`);
                const tempDOM = new JSDOM(fs.readFileSync(localPath).toString());
                const newElements = Array.from(tempDOM.window.document.documentElement.querySelectorAll("body > *"));
                for (let i = 0; i < newElements.length; i++){
                    const newElement = resolveIncludes(newElements[i], newActivePath);
                    includeElements[i].insertAdjacentElement("beforebegin", newElement);
                }
            }
        } else {
            includeElements[i].insertAdjacentElement("beforebegin", `<p class="block w-full text-center font-danger-700">Missing ${localPath}</p>`);
        }
    }
    return element;
}