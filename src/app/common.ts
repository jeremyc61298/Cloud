// app/common.ts
// Jeremy Campbell
// Common functions meant to be used by the app and features
import {Request, Response, NextFunction, Router} from "express";

// Default 404 NOT FOUND response
export function defaultNotFound(req: Request, res: Response) {
    const htmlData = {
        pageTitle: "Not Found",
        bodyTitle: "Not Found - 404",
        bodyMessage: `Could not find ${req.path} on this server.`
    }
    res.status(404);
    res.type("text/html");
    res.render("default.hb", htmlData);
}

// 400 BAD REQUEST when file too big
export function uploadTooLarge(err: ServerError, req: Request, res: Response, next: NextFunction) {
    if (err.name == "MulterError" && err.code === "LIMIT_FILE_SIZE") {
        const htmlData = {
            pageTitle: "Bad Request",
            bodyTitle: "Bad Request - 400",
            bodyMessage: err.message
        }
        res.status(400);
        res.type("text/html");
        res.render("default.hb", htmlData);
    } else {
        next(err);
    }
}

// Error type to be used for internal errors
export class ServerError extends Error {
    message: string;
    code: string;
    constructor(message: string, code: string) {
        super(message);
        this.message = message;
        this.code = code;
    }
}

// Default 500 INTERNAL ERROR response
export function defaultInternalError(err: ServerError, req: Request, res: Response, next: NextFunction) {
    const htmlData = {
        pageTitle: "Internal Error",
        bodyTitle: "Internal Error - 500",
        bodyMessage: "Oops! Something went wrong on our end. Please try again soon."
    }
    console.log(err);
    res.status(500);
    res.type("text/html");
    res.render("default.hb", htmlData);
}