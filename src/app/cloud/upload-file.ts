// upload-file.ts
// Jeremy Campbell
// Exports a middleware function for handling user uploads to the cloud
import fs from "fs";
import * as config from "../../config";
import {ServerError} from "../common";
import {Request, Response, NextFunction} from "express";
import {promisify} from "util";

const renameAsync = promisify(fs.rename);

interface UploadRequestBody {
    currentDir?: string;
}

function transformCurrentDirectory(frontEndView: string): string {
    return "." + frontEndView.replace(config.cloudDirectoryUserView, config.cloudDirectory);
}

export async function uploadFile(req: Request, res: Response, next: NextFunction) {
    let uploadBody = req.body as UploadRequestBody;
    if (uploadBody.currentDir) {
        // This (req.file) should always be true because of the "required" attribute on the file input
        if (req.file) {
            const backEndView = transformCurrentDirectory(uploadBody.currentDir);
            try {
                await renameAsync(req.file.path, backEndView + req.file.originalname);
            } catch (err) {
                console.log(err);
            }
        }
        res.redirect(303, uploadBody.currentDir);
    } else {
        next(new ServerError("Problem uploading file from the user"));
    }
}