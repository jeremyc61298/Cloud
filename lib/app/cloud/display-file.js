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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const readfileP = util_1.promisify(fs_1.default.readFile);
// requestedFile is the relative path from the working directory
function displayFile(req, res, requestedFile) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200);
        res.type(requestedFile.substr(requestedFile.lastIndexOf(".")));
        let fileContents = "";
        // If there is a "download" field in req.query, send the file as a download
        // If there isn't, display the contents in the browser
        if (req.query.download !== undefined) {
            res.download(requestedFile, requestedFile.substr(requestedFile.lastIndexOf("/")));
        }
        else {
            try {
                let buffer = yield readfileP(requestedFile);
                fileContents = buffer.toString();
            }
            catch (err) {
                console.log("Problems find the requested file.", err.toString());
            }
            res.send(fileContents);
        }
    });
}
exports.displayFile = displayFile;
//# sourceMappingURL=display-file.js.map