"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const config = __importStar(require("../../config"));
class File {
    constructor(name, path, downloadPath, imgPath) {
        this.name = name;
        this.path = path;
        this.downloadPath = downloadPath;
        this.imgPath = imgPath;
    }
}
// Change these fs methods from using calbacks to using promises
const readdirP = util_1.promisify(fs_1.default.readdir);
const statP = util_1.promisify(fs_1.default.stat);
// This code is mainly taken from Dr. Fousts lecture on promises
function buildCurrentDirData(requestedDir, userDirName) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = [];
        try {
            const entries = yield readdirP(requestedDir);
            const statPromises = [];
            for (const entry of entries) {
                statPromises.push(statP(requestedDir + entry));
            }
            const stats = yield Promise.all(statPromises);
            for (let i = 0; i < entries.length; i++) {
                // filePath is relative to what the user will see
                const filePath = userDirName + entries[i];
                let imgPath;
                let downloadPath;
                if (stats[i].isFile()) {
                    imgPath = config.downloadImg;
                    downloadPath = filePath + "?download";
                }
                else {
                    imgPath = config.dirImg;
                    downloadPath = filePath;
                }
                files.push(new File(entries[i], filePath, downloadPath, imgPath));
            }
        }
        catch (err) {
            console.log("Error getting information about current directory", err);
        }
        return files;
    });
}
// If the requested path is mapped to a directory, make sure it has
// a ending slash. This will allow for subdirectories
// For now, this does allow the path "/cloud" to not have a trailing slash
function requireDirSlash(req) {
    let newUrl = null;
    if (!req.path.endsWith("/")) {
        newUrl = req.baseUrl + req.path + "/";
    }
    return newUrl;
}
// Generate data to render template and send to browser
function displayDir(req, res, requestedDir) {
    return __awaiter(this, void 0, void 0, function* () {
        let dirContents = [];
        const userDirName = req.baseUrl + req.path;
        // Check if a ending slash is needed. If so, redirect to the new url.
        // Then attempt to find needed data for the requested directory
        let newUrl = requireDirSlash(req);
        if (newUrl) {
            res.redirect(307, newUrl);
        }
        else {
            try {
                dirContents = yield buildCurrentDirData(requestedDir, userDirName);
            }
            catch (err) {
                console.log("Problem accessing requested directory", err);
            }
            const cloudData = {
                dirName: userDirName,
                files: dirContents
            };
            res.status(200);
            res.render("cloud.hb", cloudData);
        }
    });
}
exports.displayDir = displayDir;
//# sourceMappingURL=display-dir.js.map