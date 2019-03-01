// app/index.ts
// Jeremy Campbell
// Main application for Cloud-HU
import express from "express";
import morgan from "morgan";
import * as exphbs from "express-handlebars";
import * as config from "../config";
import {router as cloudRouter} from "./cloud/routes";
import {router as defaultResponses} from "./common";

export const app = express();

// Associate templates with handlebars files with ".hd" extension
const hbsEngine = exphbs.create({extname: ".hb"}).engine;
app.engine("hb", hbsEngine);

// Look in the 'templates' directory for templates
app.set('views', process.cwd() + '/templates');

// Logging 
app.use(morgan(config.logType));

app.use(cloudRouter);

// Collection of default reponses for 404, 500, etc..
app.use(defaultResponses);