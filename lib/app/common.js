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
// 400 BAD REQUEST response
function badRequest(res, message = "That request is not allowed") {
    const htmlData = {
        pageTitle: "Bad Request",
        bodyTitle: "Bad Request - 400",
        bodyMessage: message
    };
    res.status(400);
    res.type("text/html");
    res.render("default.hb", htmlData);
}
exports.badRequest = badRequest;
// Error type to be used for internal errors
class ServerError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.ServerError = ServerError;
// Default 500 INTERNAL ERROR response
function defaultInternalError(err, req, res, next) {
    const htmlData = {
        pageTitle: "Internal Error",
        bodyTitle: "Internal Error - 500",
        bodyMessage: "Oops! Something went wrong on our end. Please try again soon."
    };
    res.status(500);
    res.type("text/html");
    res.render("default.hb", htmlData);
}
exports.defaultInternalError = defaultInternalError;
//# sourceMappingURL=common.js.map