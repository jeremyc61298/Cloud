// server.ts
// Jeremy Campbell
// Entry point for Cloud-HU
import {app} from "./app";
import http from "http";

const server = http.createServer(app);

server.listen(8000, () => {
    console.log("Listening on port 8000...");
});