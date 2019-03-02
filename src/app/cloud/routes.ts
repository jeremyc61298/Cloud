// cloud/index.ts
// Jeremy Campbell
// Main feature for Cloud-HU
import {Router} from "express";
import {displayCurrentDir} from "./display-dir";

export const router = Router();

// The "cloud" url should actually map to the user folder
// also this shouldn't be for "any" request method
router.use("/cloud", displayCurrentDir);