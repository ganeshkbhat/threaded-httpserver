/**  
 * 
 */

import * as http from "node:http";
import * as https from "node:https";
import cluster from "node:cluster";
// import { } from "node:child_process";
import { dirname, normalize } from "path";
import { fileURLToPath } from "url";
import { availableParallelism } from "node:os";
import { fileURLToPath } from "node:url";
import * as os from "node:os";

import { Threaded, ThreadedAsync, default as threading } from "./threads.js";
import { Processes, ProcessesAsync, default as processing } from "./processes.js";


function ThreadedProcess(filepath, numT, numP, options = { host: "localhost", port: 3000, listener: null, callback: null, handle: null }, framework = "http") {
    let threadedPool = [];
    let host = options.host || "localhost";
    let port = options.port || 3000;

    /** @type {http.RequestListener} */
    listener = !!listener ? listener : function (req, res) {
        res.writeHead(200);
        res.end(`Default: Hello World! (threadId: ${threadId})\n`);
    };

    if (cluster.isPrimary) {
        if (os.type !== "Windows_NT") {
            if (isMainThread) {

            }
        }
    } else if (cluster.isWorker) {
        if (os.type !== "Windows_NT") {
            if (isMainThread) {

            }
        }
    }
}
