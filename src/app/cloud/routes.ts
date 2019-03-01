// cloud/index.ts
// Jeremy Campbell
// Main feature for Cloud-HU
import express from "express";

export const router = express.Router();

router.use("/cloud", (req, res) => {
    const cloudData = {
        username: "User",
        bodyTitle: "Main Cloud Page",
        bodyMessage: "Welcome to your Cloud!",
    }
    res.status(200);
    res.type("text/html");
    res.render("cloud.hb", cloudData);
});