// import * as http from "node:http";
// import * as https from "node:https";
// import express from "express";
// import Threaded from "../index.js";

// const app = express();

// http.createServer(app).listen(3000);
// // https.createServer(app).listen(3001);

// Threaded(10, "localhost", 3000, app, "express");

import * as http from "node:http";
import * as https from "node:https";
import express from "express";
import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";
import { availableParallelism } from "node:os";
import { fileURLToPath } from "node:url";
import * as os from "node:os";


// export function Threaded(num, host, port, listener, framework = "http") {
const host = "locahost";
const port = 9000;


// export default Threaded;
const listener = express();
listener.get("/", (req, res, next) => {
    res.writeHead(200);
    res.end(`Hello World Express! (threadId: ${threadId})\n`);
});


// /** @type {http.RequestListener} */
// listener = listener || function (req, res) {
//     res.writeHead(200);
//     res.end(`Hello World! (threadId: ${threadId})\n`);
// };

if (isMainThread) {
    const server = http.createServer(listener);
    server.listen(port, () => {
        console.log(`Listening on http://${host}:${port}/ (threadId: ${threadId})`);
        const maxWorkers = availableParallelism() - 1;

        for (let i = 0; i < maxWorkers; i++) {
            let data;
            if (os.type() === "Windows_NT") {
                data = { workerData: { handle: { port: server._handle.port } } }
            } else {
                data = { workerData: { handle: { fd: server._handle.fd } } }
            }
            new Worker(fileURLToPath(import.meta.url), data);
        }
    });
} else {
    http.createServer(listener).listen(workerData.handle, () => {
        console.log(`Listening on (threadId: ${threadId}) http://${host}:${port}/ `);
    });
}
// }

// Threaded(10, "localhost", 9000, app, "express");
