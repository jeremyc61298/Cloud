// display-dir.ts
// Jeremy Campbell
// Exports a middleware function to display the requested cloud directory 
import {Request, Response} from "express";
import fs from "fs";
import {promisify} from "util";
import * as config from "../../../config";

class File {
    name: string;
    path: string;
    downloadPath: string;
    imgPath: string;

    constructor(name: string, path: string, 
        downloadPath: string, imgPath: string){
        this.name = name;
        this.path = path;
        this.downloadPath = downloadPath;
        this.imgPath = imgPath;
    }
}

// Change these fs methods from using calbacks to using promises
const readdirP = promisify(fs.readdir);
const statP = promisify(fs.stat);

function organizeDirectory(files: File[], subdirs: File[]): File[] {
    files.sort();
    subdirs.sort();
    return subdirs.concat(files);
}

// This code is mainly taken from Dr. Fousts lecture on promises
async function buildCurrentDirData(requestedDir: string, userDirName: string): Promise<File[]> {
    let directory: File[] = [];
    let subdirectories: File[] = [];
    let files: File[] = [];
    try {
        const entries = await readdirP(requestedDir);
        const statPromises: Promise<fs.Stats>[] = [];

        for (const entry of entries) {
            statPromises.push(statP(requestedDir + entry));
        }

        const stats = await Promise.all(statPromises);

        for (let i = 0; i < entries.length; i++)  {
            // filePath is relative to what the user will see
            const filePath = userDirName + entries[i];
            let imgPath: string;
            let downloadPath: string; 

            if (stats[i].isFile()) {
                imgPath = config.downloadImg 
                downloadPath = filePath + "?download";
                files.push(new File(entries[i], filePath, downloadPath, imgPath));
            } else {
                imgPath = config.dirImg; 
                downloadPath = filePath;
                subdirectories.push(new File(entries[i], filePath, downloadPath, imgPath));
            } 
        }
        directory = organizeDirectory(files, subdirectories);
    } catch(err) {
        console.log("Error getting information about current directory", err);
    }
    return directory;
}

 // If the requested path is mapped to a directory, make sure it has
 // a ending slash. This will allow for subdirectories
 // This does not reapply the possible query string, but it is not used in this feature 
function requireDirSlash(req: Request): string | null {
    let newUrl: string | null = null;
    if (!req.path.endsWith("/")){
        newUrl = req.baseUrl + req.path + "/";
    } else if (req.path.length == 1 && !req.originalUrl.includes(config.cloudDirectoryUserView + "/")){
        // The requested path is /cloud, which express confuses with /cloud/
        newUrl = req.baseUrl + "/";
    }
    return newUrl;
}

// Generate data to render template and send to browser
export async function displayDir(req: Request, res: Response, requestedDir: string) {
    let dirContents: File[] = [];
    const userDirName = req.baseUrl + req.path;

    // Check if a ending slash is needed. If so, redirect to the new url.
    // Then attempt to find needed data for the requested directory
    let newUrl = requireDirSlash(req);
    if (newUrl) {
        res.redirect(307, newUrl);
    } else {
        try {
            dirContents = await buildCurrentDirData(requestedDir, userDirName);
        } catch (err) {
            console.log("Problem accessing requested directory", err);
        }
    
        const cloudData = {
            dirName: userDirName,
            files: dirContents
        }
    
        res.status(200);
        res.render("cloud.hb", cloudData);
    }
}