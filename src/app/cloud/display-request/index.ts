// display-request/index.ts
// Jeremy Campbell
// Exports a middleware function for determining the type of file that was requested
// and passing control to the appropriate middleware
import {Request, Response, NextFunction} from "express";
import {displayDir} from "./display-dir";
import {displayFile} from "./display-file";
import fs from "fs";
import * as config from "../../../config";
import { promisify } from "util";

const statP = promisify(fs.stat);

function notFoundInCloud(req: Request, res: Response) {
    const htmlData = {
        pageTitle: "Not Found",
        bodyTitle: "Not Found - 404",
        bodyMessage: `Could not find ${req.path} in your cloud.`
    }
    res.status(404);
    res.type("text/html");
    res.render("default.hb", htmlData);
}

export async function determineFileType(req: Request, res: Response, next: NextFunction) {
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
            notFoundInCloud(req, res);
        }
    }
}