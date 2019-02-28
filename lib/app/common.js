"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// app/common.ts
// Jeremy Campbell
const express_1 = require("express");
exports.router = express_1.Router();
exports.router.use(function defaultNotFound(err, req, res, next) {
    const htmlData = {
        pageTitle: "Not Found",
        bodyTitle: "Not Found - 404",
        bodyMessage: "Could not find the requested page on this server."
    };
    res.status(404);
    res.type("text/html");
    res.render("default.hb", htmlData);
});
//# sourceMappingURL=common.js.map