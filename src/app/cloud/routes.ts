// cloud/index.ts
// Jeremy Campbell
// Main feature for Cloud-HU
import {Router, Request, Response} from "express";
import {displayDir} from "./display-dir";
import {displayFile} from "./display-file";
import fs from "fs";
import * as config from "../../config";
import { promisify } from "util";

export const router = Router();

// The "cloud" url should actually map to the user folder
// also this shouldn't be for "any" request method
router.use("/cloud", determineFileType);

const statP = promisify(fs.stat);

async function determineFileType(req: Request, res: Response) {
    let requestedFile = "./" + config.cloudDirectory + req.path;
    const rfStats = await statP(requestedFile);
    if (rfStats.isDirectory()) {
        displayDir(req, res, requestedFile);
    } else {
        displayFile(req, res, requestedFile);
    }
}