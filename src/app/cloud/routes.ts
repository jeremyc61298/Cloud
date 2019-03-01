// cloud/index.ts
// Jeremy Campbell
// Main feature for Cloud-HU
import {Router, Request, Response} from "express";
import fs from "fs";

export const router = Router();

// The "cloud" url should actually map to the user folder
// also this shouldn't be for any request method
router.use("/cloud", displayCloudStructure);

class File {
    name: string;
    fileType: string;
    constructor(name: string, fileType: string){
        this.name = name;
        this.fileType = fileType;
    }
}

// This should go in another file
function displayCloudStructure(req: Request, res: Response) {
    const dirContents: File[] = [];
    fs.readdir("./user", (err, entries) => {
        if (err) {
            console.log("Could not read directory");
            console.log(err);
        } else {
            for (const entry of entries) {
                fs.stat(`./user/${entry}`, (err, stats) => {
                    if (err) {console.log(err);}
                    else {
                        const fileType = (stats.isDirectory()) ? "Directory" : "File";
                        dirContents.push({name: entry, fileType: fileType});
                    }
                });
            }
        }
    });
    
    const cloudData = {
        dirName: "cloud",
        files: dirContents
    }
    res.status(200);
    res.type("text/html");
    res.render("cloud.hb", cloudData);
}