"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app/index.ts
// Jeremy Campbell
// Main application for Cloud-HU
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
exports.app = app;
// Middleware and routers go here
app.use(morgan_1.default("dev"));
//# sourceMappingURL=index.js.map