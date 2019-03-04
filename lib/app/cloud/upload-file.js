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
const renameAsync = util_1.promisify(fs_1.default.rename);
function transformCurrentDirectory(frontEndView) {
    return "." + frontEndView.replace(config.cloudDirectoryUserView, config.cloudDirectory);
}
// Need to current directory. Use an interface for req.body 
function uploadFile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let uploadBody = req.body;
        if (uploadBody.currentDir) {
            const backEndView = transformCurrentDirectory(uploadBody.currentDir);
            fs_1.default.rename(req.file.path, backEndView + req.file.originalname, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("File moved");
                }
            });
            res.redirect(303, uploadBody.currentDir);
        }
        else {
            res.send("problem");
        }
    });
}
exports.uploadFile = uploadFile;
//# sourceMappingURL=upload-file.js.map