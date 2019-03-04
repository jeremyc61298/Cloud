// upload-file.ts
// Jeremy Campbell
// Exports a middleware function for handling user uploads to the cloud
import {Request, Response} from "express";
import fs from "fs";
import {promisify} from "util";
import * as config from "../../config";

const renameAsync = promisify(fs.rename);

// Need to current directory. Use an interface for req.body 
export async function uploadFile(req: Request, res: Response) {
    const newFile = await renameAsync(req.file.path, `.${config.cloudDirectory}`)
}