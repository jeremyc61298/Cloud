"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// cloud/index.ts
// Jeremy Campbell
// Main feature for Cloud-HU
const express_1 = require("express");
const display_dir_1 = require("./display-dir");
exports.router = express_1.Router();
// The "cloud" url should actually map to the user folder
// also this shouldn't be for "any" request method
exports.router.use("/cloud", display_dir_1.displayCurrentDir);
//# sourceMappingURL=routes.js.map