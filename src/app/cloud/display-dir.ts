// display-dir.ts
// Jeremy Campbell
// Exports a middleware function to display the requested cloud directory 
import {Request, Response} from "express";
import fs from "fs";
import {promisify} from "util";
import * as config from "../../config";

class File {
    name: string;
    fileType: string;
    constructor(name: string, fileType: string){
        this.name = name;
        this.fileType = fileType;
    }
}

// Change these fs methods from using calbacks to using promises
const readdirP = promisify(fs.readdir);
const statP = promisify(fs.stat);

// This code is mainly taken from Dr. Fousts lecture on promises
async function buildCurrentDirData(currentDir: string): Promise<File[]> {
    const files: File[] = [];
    try {
        const entries = await readdirP(currentDir);
        const statPromises: Promise<fs.Stats>[] = [];

        for (const entry of entries) {
            statPromises.push(statP(currentDir + entry));
        }

        const stats = await Promise.all(statPromises);

        for (let i = 0; i < entries.length; i++)  {
            const fileType = (stats[i].isFile()) ? "File" : "Directory";
            files.push(new File(entries[i], fileType));
        }

    } catch(err){
        console.log("Error getting information about current directory", err);
    }
    return files;
}

async function requireDirSlash(currentDir: string, reqPath: string, res: Response) {
   const stats = await statP(currentDir);
   if (stats.isDirectory) {
       res.redirect(307, reqPath + "/");
   }
}

// Generate data to render template and send to browser
export async function displayCurrentDir(req: Request, res: Response) {
    const currentDir = "./" + config.cloudDirectory + req.path;
    requireDirSlash(currentDir, req.path, res);
    const dirContents = await buildCurrentDirData(req.path);
    const cloudData = {
        dirName: "cloud",
        files: dirContents
    }
    res.status(200);
    res.type("text/html");
    res.render("cloud.hb", cloudData);
}