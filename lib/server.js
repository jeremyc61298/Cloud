"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
// Jeremy Campbell
// Entry point for Cloud-HU
const app_1 = require("./app");
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app_1.app);
server.listen(8000, () => {
    console.log("Listening on port 8000...");
});
//# sourceMappingURL=server.js.map