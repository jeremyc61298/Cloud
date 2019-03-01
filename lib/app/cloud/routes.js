"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// cloud/index.ts
// Jeremy Campbell
// Main feature for Cloud-HU
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
exports.router = express_1.Router();
// The "cloud" url should actually map to the user folder
// also this shouldn't be for any request method
exports.router.use("/cloud", displayCloudStructure);
class File {
    constructor(name, fileType) {
        this.name = name;
        this.fileType = fileType;
    }
}
// This should go in another file
function displayCloudStructure(req, res) {
    const dirContents = [];
    fs_1.default.readdir("./user", (err, entries) => {
        if (err) {
            console.log("Could not read directory");
            console.log(err);
        }
        else {
            for (const entry of entries) {
                fs_1.default.stat(`./user/${entry}`, (err, stats) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        const fileType = (stats.isDirectory()) ? "Directory" : "File";
                        dirContents.push({ name: entry, fileType: fileType });
                    }
                });
            }
        }
    });
    const cloudData = {
        dirName: "cloud",
        files: dirContents
    };
    res.status(200);
    res.type("text/html");
    res.render("cloud.hb", cloudData);
}
//# sourceMappingURL=routes.js.map