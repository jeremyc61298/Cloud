// display-dir.ts
// Jeremy Campbell
// Exports a middleware function to display the requested cloud directory 
import {Request, Response} from "express";
import fs from "fs";
import {promisify} from "util";

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
async function buildCurrentDirData(requestedDir: string): Promise<File[]> {
    const files: File[] = [];
    try {
        const entries = await readdirP(requestedDir);
        const statPromises: Promise<fs.Stats>[] = [];

        for (const entry of entries) {
            statPromises.push(statP(requestedDir + entry));
        }

        const stats = await Promise.all(statPromises);

        for (let i = 0; i < entries.length; i++)  {
            const fileType = (stats[i].isFile()) ? "File" : "Directory";
            files.push(new File(entries[i], fileType));
        }

    } catch(err) {
        console.log("Error getting information about current directory", err.toString());
    }
    return files;
}

 // If the requested path is mapped to a directory, make sure it has
 // a ending slash. This will allow for subdirectories
 // For now, this does allow the path "/cloud" to not have a trailing slash
function requireDirSlash(req: Request, requestedDir: string): string | null {
    let newUrl: string | null = null;
    if (!req.path.endsWith("/")){
        newUrl = req.baseUrl + req.path + "/";
    }
    return newUrl;
}

// Generate data to render template and send to browser
export async function displayDir(req: Request, res: Response, requestedDir: string) {
    let dirContents: File[] = [];

    // Check if a ending slash is needed. If so, redirect to the new url.
    // Then attempt to find needed data for the requested directory
    let newUrl = requireDirSlash(req, requestedDir);
    if (newUrl) {
        res.redirect(307, newUrl);
    } else {
        try {
            dirContents = await buildCurrentDirData(requestedDir);
        } catch (err) {
            console.log("Problem accessing requested directory", err);
        }
    
        const cloudData = {
            dirName: "cloud",
            files: dirContents
        }
    
        res.status(200);
        res.type("text/html");
        res.render("cloud.hb", cloudData);
    }
}