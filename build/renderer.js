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

function resolveIncludes(html, activeDir){
    const includeElements = html.match(/\<include.*?\>/g);
    let output = html;
    if (includeElements?.length){
        for (let i = 0; i < includeElements.length; i++){
            let localPath = includeElements[i].replace(/(\<include.*src\=[\'\"])|[\'\"].*/g, "");
            let snippetHTML = `<p class="block w-full font-danger-700">Missing file: '${localPath}'</p>`;
            if (localPath){
                if (new RegExp(/(\.html)$/).test(localPath)){
                    localPath = path.resolve(activeDir, localPath);
                } else {
                    localPath = path.resolve(activeDir, localPath, "index.html");
                }
                if (fs.existsSync(localPath)){
                    snippetHTML = resolveIncludes(fs.readFileSync(localPath).toString(), path.resolve(activeDir, `${localPath.replace(/(?!.*[\/\\]).*/, "")}`));
                }
            }
            output = output.replace(includeElements[i], snippetHTML);
        }
    }
    return output;
}