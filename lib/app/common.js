"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Default 404 NOT FOUND response
function defaultNotFound(req, res) {
    const htmlData = {
        pageTitle: "Not Found",
        bodyTitle: "Not Found - 404",
        bodyMessage: `Could not find ${req.path} on this server.`
    };
    res.status(404);
    res.type("text/html");
    res.render("default.hb", htmlData);
}
exports.defaultNotFound = defaultNotFound;
// TODO: Error handlers
//# sourceMappingURL=common.js.map