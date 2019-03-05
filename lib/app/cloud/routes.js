"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// cloud/index.ts
// Jeremy Campbell
// Main feature for Cloud-HU
const express_1 = require("express");
const upload_file_1 = require("./upload-file");
const display_request_1 = require("./display-request");
const config_1 = require("../../config");
const multer_1 = __importDefault(require("multer"));
exports.router = express_1.Router();
const limits = { fileSize: config_1.maxUploadSize };
const upload = multer_1.default({
    dest: "./uploads/",
    limits: limits
});
// The "cloud" url should actually map to the user folder
// also this shouldn't be for "any" request method
exports.router.post("/", upload.single("userfile"));
exports.router.post("/", upload_file_1.uploadFile);
exports.router.use(display_request_1.determineFileType);
//# sourceMappingURL=routes.js.map