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

// TODO: Error handlers