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
// upload-file.ts
// Jeremy Campbell
// Exports a middleware function for handling user uploads to the cloud
const fs_1 = __importDefault(require("fs"));
const config = __importStar(require("../../config"));
const common_1 = require("../common");
const util_1 = require("util");
const renameAsync = util_1.promisify(fs_1.default.rename);
function transformCurrentDirectory(frontEndView) {
    return "." + frontEndView.replace(config.cloudDirectoryUserView, config.cloudDirectory);
}
function uploadFile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let uploadBody = req.body;
        if (uploadBody.currentDir) {
            // This (req.file) should always be true because of the "required" attribute on the file input
            if (req.file) {
                const backEndView = transformCurrentDirectory(uploadBody.currentDir);
                try {
                    yield renameAsync(req.file.path, backEndView + req.file.originalname);
                }
                catch (err) {
                    console.log(err);
                }
            }
            res.redirect(303, uploadBody.currentDir);
        }
        else {
            next(new common_1.ServerError("Problem uploading file from the user", "UPLOAD_ERROR"));
        }
    });
}
exports.uploadFile = uploadFile;
//# sourceMappingURL=upload-file.js.map