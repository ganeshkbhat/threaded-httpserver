<<<<<<< HEAD
import * as http from "node:http";
import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";
import { availableParallelism } from "node:os";
import { fileURLToPath } from "node:url";
import * as os from "node:os";

function mainThread(num, host, port, listener, framework) {
    const server = framework !== "koa" ? http.createServer(listener) : http.createServer(listener.callback());
    server.listen(port, () => {
        console.log(`Listening on http://${host}:${port}/ (threadId: ${threadId})`);
        const maxWorkers = num || (availableParallelism() - 1);

        for (let i = 0; i < maxWorkers; i++) {
            let data;
            if (os.type() === "Windows_NT") {
                data = { workerData: { handle: { port: server._handle.port }, num, host, port, listener, framework } };
            } else {
                data = { workerData: { handle: { port: server._handle.port }, num, host, port, listener, framework } };
            }
            new Worker(fileURLToPath(import.meta.url), data);
        }
    });
}

function thread(num, host, port, listener, framework) {
    http.createServer(workerData.framework !== "koa" ? workerData.listener : workerData.listener.callback()).listen(workerData.handle, () => {
        console.log(`Listening on http://${host}:${port}/ (threadId: ${threadId})`);
    });
}

export function Threaded(num, host, port, listener, framework = "http") {
    host = host || "locahost";
    port = port || 9000;

    /** @type {http.RequestListener} */
    listener = listener || function (req, res) {
        res.writeHead(200);
        res.end(`Hello World! (threadId: ${threadId})\n`);
    };

    if (isMainThread) {
        mainThread(num, host, port, listener, framework);
    } else {
        thread(num, host, port, listener, framework);
    }
}

if (!isMainThread) {
    Threaded();
}

export default Threaded;
// module.exports = Threaded;
=======
/** 
 * 
 */

import { Threaded, ThreadedAsync, default as threading } from "./src/threads.js";
import { Processes, ProcessesAsync, default as processing } from "./src/processes.js";


export default {
    threading,
    processing
};

export const MultiThreaded = Threaded;
export const MultiThreadedAsync = ThreadedAsync;
export const MultiProcess = Processes;
export const MultiProcessAsync = ProcessesAsync;

>>>>>>> 2a20883606d7d2e6b4ac44ec40317914f833d2aa
