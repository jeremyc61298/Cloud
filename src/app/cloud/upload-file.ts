// upload-file.ts
// Jeremy Campbell
// Exports a middleware function for handling user uploads to the cloud
import {Request, Response} from "express";
import fs from "fs";
import {promisify} from "util";
import * as config from "../../config";

const renameAsync = promisify(fs.rename);

interface UploadRequestBody {
    currentDir?: string;
}

function transformCurrentDirectory(frontEndView: string): string {
    return "." + frontEndView.replace(config.cloudDirectoryUserView, config.cloudDirectory);
}

// Need to current directory. Use an interface for req.body 
export async function uploadFile(req: Request, res: Response) {
    let uploadBody = req.body as UploadRequestBody;
    if (uploadBody.currentDir) {
        const backEndView = transformCurrentDirectory(uploadBody.currentDir);
        fs.rename(req.file.path, backEndView + req.file.originalname, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("File moved");
            }
        });
        res.redirect(303, uploadBody.currentDir);
    } else {
        res.send("problem");
    }
}