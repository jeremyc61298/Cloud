// cloud/index.ts
// Jeremy Campbell
// Main feature for Cloud-HU
import {Router} from "express";
import {uploadFile} from "./upload-file";
import {determineFileType} from "./display-request"
import {maxUploadSize} from "../../config";
import multer from "multer";

export const router = Router();

const limits = { fileSize: maxUploadSize};

const upload = multer({
    dest: "./uploads/",
    limits: limits
});

// The "cloud" url should actually map to the user folder
// also this shouldn't be for "any" request method
router.post("/", upload.single("userfile"))
router.post("/", uploadFile);
router.use(determineFileType);