// cloud/index.ts
// Jeremy Campbell
// Main routing for Cloud-HU
import {Router} from "express";
import {uploadFile} from "./upload-file";
import {determineFileType, disallowParentDirectoryRequest} from "./display-request"
import {maxUploadSize} from "../../config";
import multer from "multer";

export const router = Router();

const limits = { fileSize: maxUploadSize};

const upload = multer({
    dest: "./uploads/",
    limits: limits
});

router.use(disallowParentDirectoryRequest);
router.post("/", upload.single("userfile"));
router.post("/", uploadFile);
router.use(determineFileType);