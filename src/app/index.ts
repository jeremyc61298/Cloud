// app/index.ts
// Jeremy Campbell
// Main application for Cloud-HU
import express from "express";
import morgan from "morgan";
import {router as cloudRouter} from "./cloud/routes";

export const app = express();

// Middleware and routers go here
app.use(morgan("dev"));

app.use(cloudRouter);