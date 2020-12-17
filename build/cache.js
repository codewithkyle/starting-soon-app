const fs = require("fs");
const glob = require("glob");
const cwd = process.cwd();
const path = require("path");

const publicAssetsDir = path.join(cwd, "public", "assets");
const scriptFiles = glob.sync(`${publicAssetsDir}/*.mjs`);
const cssFiles = glob.sync(`${publicAssetsDir}/*.css`);
const assetFiles = [...scriptFiles, ...cssFiles];
const package = require("../package.json");
const outputFilePath = path.join(cwd, "public", "service-worker-assets.js");

if (fs.existsSync(outputFilePath)){
    fs.unlinkSync(outputFilePath);
}

let output = 
`
self.assetsManifest = {
    "version": "${package.version}",
    "assets": [
        "index.html",
`;

for (let i = 0; i < assetFiles.length; i++){
    const fileName = assetFiles[i].replace(/.*[\/\\]/, "");
    output += `\t\t"assets/${fileName}"`;
    if (i < assetFiles.length - 1){
        output += ",\n";
    }
}

output += 
`
    ]
}
`;

fs.writeFileSync(outputFilePath, output);
process.exit(0);