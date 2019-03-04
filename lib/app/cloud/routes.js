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
// cloud/index.ts
// Jeremy Campbell
// Main feature for Cloud-HU
const express_1 = require("express");
const display_dir_1 = require("./display-dir");
const display_file_1 = require("./display-file");
const upload_file_1 = require("./upload-file");
const fs_1 = __importDefault(require("fs"));
const config = __importStar(require("../../config"));
const util_1 = require("util");
const multer_1 = __importDefault(require("multer"));
const common_1 = require("../common");
exports.router = express_1.Router();
const upload = multer_1.default({ dest: "./uploads/" });
// The "cloud" url should actually map to the user folder
// also this shouldn't be for "any" request method
exports.router.post("/", upload.single("userfile"));
exports.router.post("/", upload_file_1.uploadFile);
exports.router.use(determineFileType);
const statP = util_1.promisify(fs_1.default.stat);
function determineFileType(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let requestedFile = "./" + config.cloudDirectory + req.path;
        try {
            const rfStats = yield statP(requestedFile);
            if (rfStats.isDirectory()) {
                display_dir_1.displayDir(req, res, requestedFile);
            }
            else {
                display_file_1.displayFile(req, res, requestedFile);
            }
        }
        catch (err) {
            // Requested file was not found
            if (err.code === "ENOENT") {
                common_1.defaultNotFound(req, res);
            }
        }
    });
}
//# sourceMappingURL=routes.js.map