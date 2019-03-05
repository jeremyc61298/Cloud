// app/common.ts
// Jeremy Campbell
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

// 400 BAD REQUEST response
export function badRequest(res: Response, message = "That request is not allowed") {
    const htmlData = {
        pageTitle: "Bad Request",
        bodyTitle: "Bad Request - 400",
        bodyMessage: message
    }
    res.status(400);
    res.type("text/html");
    res.render("default.hb", htmlData);
}

// Error type to be used for internal errors
export class ServerError extends Error {
    message: string;
    constructor(message: string) {
        super(message);
        this.message = message;
    }
}

// Default 500 INTERNAL ERROR response
export function defaultInternalError(err: ServerError, req: Request, res: Response, next: NextFunction) {
    const htmlData = {
        pageTitle: "Internal Error",
        bodyTitle: "Internal Error - 500",
        bodyMessage: "Oops! Something went wrong on our end. Please try again soon."
    }
    res.status(500);
    res.type("text/html");
    res.render("default.hb", htmlData);
}