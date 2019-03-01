"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// cloud/index.ts
// Jeremy Campbell
// Main feature for Cloud-HU
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
exports.router.use("/cloud", (req, res) => {
    const cloudData = {
        username: "User",
        bodyTitle: "Main Cloud Page",
        bodyMessage: "Welcome to your Cloud!",
    };
    res.status(200);
    res.type("text/html");
    res.render("cloud.hb", cloudData);
});
//# sourceMappingURL=routes.js.map