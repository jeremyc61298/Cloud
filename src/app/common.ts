// app/common.ts
// Jeremy Campbell
import {Request, Response, NextFunction, Router} from "express";

export const router = Router();

router.use(function defaultNotFound(err: Error, req: Request, res: Response, next: NextFunction) {
    const htmlData = {
        pageTitle: "Not Found",
        bodyTitle: "Not Found - 404",
        bodyMessage: "Could not find the requested page on this server."
    }
    res.status(404);
    res.type("text/html");
    res.render("default.hb", htmlData);
});