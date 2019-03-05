// display-file.ts
// Jeremy Campbell
// Exports a middleware function to display the requested cloud file in the browser
import {Request, Response} from "express";
import fs from "fs";
import { promisify } from "util";

const readfileP = promisify(fs.readFile);

// requestedFile is the relative path from the working directory
export async function displayFile(req: Request, res: Response, requestedFile: string) {
    res.status(200);
    res.type(requestedFile.substr(requestedFile.lastIndexOf(".")));
    let fileContents: string = "";

    // If there is a "download" field in req.query, send the file as a download
    // If there isn't, display the contents in the browser
    if (req.query.download !== undefined) {
        res.download(requestedFile, requestedFile.substr(requestedFile.lastIndexOf("/")));
    } else {
        try {
            let buffer = await readfileP(requestedFile);
            fileContents = buffer.toString();
        } catch (err) {
            console.log("Problems find the requested file.", err.toString());
        }
        res.send(fileContents);
    }
    
}