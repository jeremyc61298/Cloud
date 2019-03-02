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
    constructor(name, fileType) {
        this.name = name;
        this.fileType = fileType;
    }
}
// Change these fs methods from using calbacks to using promises
const readdirP = util_1.promisify(fs_1.default.readdir);
const statP = util_1.promisify(fs_1.default.stat);
// This code is mainly taken from Dr. Fousts lecture on promises
function buildCurrentDirData(requestedPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = [];
        const currentDir = "./" + config.cloudDirectory + requestedPath;
        console.log(currentDir);
        try {
            const entries = yield readdirP(currentDir);
            const statPromises = [];
            console.log(entries);
            for (const entry of entries) {
                statPromises.push(statP(currentDir + entry));
            }
            const stats = yield Promise.all(statPromises);
            for (let i = 0; i < entries.length; i++) {
                const fileType = (stats[i].isFile()) ? "File" : "Directory";
                files.push(new File(entries[i], fileType));
            }
        }
        catch (err) {
            console.log("Error getting information about current directory", err);
        }
        return files;
    });
}
// Generate data to render template and send to browser
function displayCurrentDir(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const dirContents = yield buildCurrentDirData(req.path);
        const cloudData = {
            dirName: "cloud",
            files: dirContents
        };
        res.status(200);
        res.type("text/html");
        res.render("cloud.hb", cloudData);
    });
}
exports.displayCurrentDir = displayCurrentDir;
//# sourceMappingURL=display-dir.js.map