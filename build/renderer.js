const fs = require("fs");
const path = require("path");
const cwd = process.cwd();

const base = path.join(cwd, "src", "base.html");
if (!fs.existsSync(base)){
    console.error("Missing base file: ", base);
    process.exit(1);
}

let html = fs.readFileSync(base).toString();
html = resolveIncludes(html, path.join(cwd, "src"));

const public = path.join(cwd, "public", "index.html");
if (fs.existsSync(public)){
    fs.unlinkSync(public);
}
fs.writeFileSync(public, html);
process.exit(0);

function parseDataset(html){
    const dataset = {};
    const attributes = html.match(/data\-.*?[\'\"].*?[\'\"]/g);
    if (attributes?.length){
        for (let i = 0; i < attributes.length; i++){
            const key = attributes[i].replace(/(data\-)|\=.*/g, "");
            const value = attributes[i].replace(/(data\-.*?[\'\"])|[\'\"]/g, "");
            dataset[key] = value;
        }
    }
    return dataset;
}

function resolveIncludes(html, activeDir){
    html = html.replace(/\<\/([\s]+)?include([\s]+)?\>/g, "");
    const includeElements = html.match(/\<include.*?\>/g);
    let output = html;
    if (includeElements?.length){
        for (let i = 0; i < includeElements.length; i++){
            let localPath = includeElements[i].replace(/(\<include.*src\=[\'\"])|[\'\"].*/g, "");
            let snippetHTML = `<p class="font-danger-700">Missing file: '${localPath}'</p>`;
            if (localPath){
                if (new RegExp(/(\.html)$/).test(localPath)){
                    localPath = path.resolve(activeDir, localPath);
                } else {
                    localPath = path.resolve(activeDir, localPath, "index.html");
                }
                if (fs.existsSync(localPath)){
                    const newActivePath = path.resolve(activeDir, `${localPath.replace(/(?!.*[\/\\]).*/, "")}`);
                    let newHTML = fs.readFileSync(localPath).toString();
                    const dataset = parseDataset(html);
                    for (const key in dataset){
                        const regex = new RegExp(`\\{[\\s+]?${key}[\\s+]?\\}`, "g");
                        newHTML = newHTML.replace(regex, dataset[key]);
                    }
                    snippetHTML = resolveIncludes(newHTML, newActivePath);
                }
            }
            output = output.replace(includeElements[i], snippetHTML);
        }
    }
    return output;
}