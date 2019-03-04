// cloud/index.ts
// Jeremy Campbell
// Main feature for Cloud-HU
import {Router, Request, Response, NextFunction} from "express";
import {displayDir} from "./display-dir";
import {displayFile} from "./display-file";
import {uploadFile} from "./upload-file";
import fs from "fs";
import * as config from "../../config";
import { promisify } from "util";
import multer from "multer";
import {defaultNotFound} from "../common";

export const router = Router();
const upload = multer({dest: "./uploads/"});

// The "cloud" url should actually map to the user folder
// also this shouldn't be for "any" request method
router.post("/", upload.single("userfile"))
router.post("/", uploadFile);
router.use("/cloud", determineFileType);

const statP = promisify(fs.stat);

async function determineFileType(req: Request, res: Response, next: NextFunction) {
    let requestedFile = "./" + config.cloudDirectory + req.path;
    try {
        const rfStats = await statP(requestedFile);
        if (rfStats.isDirectory()) {
            displayDir(req, res, requestedFile);
        } else {
            displayFile(req, res, requestedFile);
        }
    } catch (err) {
        // Requested file was not found
        if (err.code === "ENOENT") {
            defaultNotFound(req, res);
        }
    }
}