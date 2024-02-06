import * as http from "node:http";
import * as https from "node:https";
import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";
import { availableParallelism } from "node:os";
import { fileURLToPath } from "node:url";
import * as os from "node:os";
import { default as server } from "./express.js";

import { MultiThreaded, MultiThreadedAsync } from "../../index.js";
import * as path from "node:path";


// var listener = server;
// var srv = MultiThreaded(path.join("C:\\Users\\ganes\\OneDrive\\Documents\\projects\\threaded\\demos\\demos.threads\\template_thread_server.js"), 10, "localhost", 3000, listener, "express");
// setInterval(() => console.log("Threaded function implemented: ", srv), 5000);

function thread() {
    var listener = server;
    var srv = MultiThreadedAsync(path.join("C:\\Users\\ganes\\OneDrive\\Documents\\projects\\threaded\\demos\\demos.threads\\template_thread_server.js"), 10, { host: "localhost", port: 3000, listener: listener }, "express");
    // setInterval(() => console.log("Threaded function implemented: ", srv), 5000);
    srv.then(console.log);
}

thread();
