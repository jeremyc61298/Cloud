"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// app/common.ts
// Jeremy Campbell
const express_1 = require("express");
exports.router = express_1.Router();
// Default 404 NOT FOUND response
exports.router.use((req, res) => {
    const htmlData = {
        pageTitle: "Not Found",
        bodyTitle: "Not Found - 404",
        bodyMessage: `Could not find ${req.path} on this server.`
    };
    res.status(404);
    res.type("text/html");
    res.render("default.hb", htmlData);
});
// TODO: Error handlers
//# sourceMappingURL=common.js.map