// app/common.ts
// Jeremy Campbell
import {Request, Response, NextFunction, Router} from "express";

export const router = Router();

// Default 404 NOT FOUND response
router.use((req, res,) => {
    const htmlData = {
        pageTitle: "Not Found",
        bodyTitle: "Not Found - 404",
        bodyMessage: `Could not find ${req.path} on this server.`
    }
    console.log("Routing is working");
    res.status(404);
    res.type("text/html");
    res.render("default.hb", htmlData);
});

// TODO: Error handlers