// server.ts
// Jeremy Campbell
// Entry point for Cloud-HU
import {app} from "./app";
import * as config from "./config";
import http from "http";

const server = http.createServer(app);

server.listen(config.portNum, () => {
    console.log(`Listening on port ${config.portNum}...`);
});