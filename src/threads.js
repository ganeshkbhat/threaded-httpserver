/** 
 * 
 */

import * as http from "node:http";
import * as https from "node:https";
import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";
import { availableParallelism } from "node:os";
import { fileURLToPath } from "node:url";
import * as os from "node:os";


/**
 *
 *
 * @export
 * @param {*} filepath
 * @param {*} num
 * @param {*} host
 * @param {*} port
 * @param {*} listener
 * @param {string} [framework="http"]
 * @return {*} 
 */
export function Threaded(filepath, num, options = { host: "localhost", port: 3000, listener: null, callback: null }, framework = "http") {
    let threadedPool = [];
    let host = options.host || "localhost";
    let port = options.port || 3000;

    /** @type {http.RequestListener} */
    listener = !!listener ? listener : function (req, res) {
        res.writeHead(200);
        res.end(`Default: Hello World! (threadId: ${threadId})\n`);
    };

    if (isMainThread) {
        let server = framework !== "koa" ? http.createServer(listener) : http.createServer(listener);
        server.listen(port, host, function () {
            console.log(`Listening on http://${host}:${port}/ (threadId: ${threadId})`);
            const maxWorkers = num || (availableParallelism() - 1);

            for (let i = 0; i < maxWorkers; i++) {
                let data;
                if (os.type() === "Windows_NT") {
                    data = { workerData: { handle: { fd: server._handle.fd, port: server._handle.port }, threadId: i, host: host, port: port, framework: framework } }
                } else {
                    data = { workerData: { handle: { fd: server._handle.fd }, threadId: i, host: host, port: port, framework: framework } }
                }

                // 
                // using this same file as url: fileURLToPath(import.meta.url)
                // new Worker(fileURLToPath(import.meta.url), data);
                // 
                threadedPool.push(new Worker(filepath, data));
            }
        }.bind(this, server, threadedPool));
        return { server, threadedPool }
    }
}

/**
 *
 *
 * @export
 * @param {*} filepath
 * @param {*} num
 * @param {*} host
 * @param {*} port
 * @param {*} listener
 * @param {string} [framework="http"]
 * @return {*} 
 */
export function ThreadedAsync(filepath, num, options = { host: "localhost", port: 3000, listener: null, callback: null }, framework = "http") {
    return new Promise(function (resolve, reject) {
        try {
            let threadedPool = [];
            let host = options.host || "localhost";
            let port = options.port || 3000;

            /** @type {http.RequestListener} */
            let listener = !!options.listener ? options.listener : function (req, res) {
                res.writeHead(200);
                res.end(`Default: Hello World! (threadId: ${threadId})\n`);
            };

            if (isMainThread) {
                let server = framework !== "koa" ? http.createServer(listener) : http.createServer(listener);
                server.listen(port, host, function () {
                    console.log(`Listening on http://${host}:${port}/ (threadId: ${threadId})`);
                    const maxWorkers = num || (availableParallelism() - 1);

                    for (let i = 0; i < maxWorkers; i++) {
                        let data;
                        if (os.type() === "Windows_NT") {
                            data = { workerData: { handle: { fd: server._handle.fd, port: server._handle.port }, threadId: i, host: host, port: port, framework: framework } }
                        } else {
                            data = { workerData: { handle: { fd: server._handle.fd }, threadId: i, host: host, port: port, framework: framework } }
                        }

                        // 
                        // using this same file as url: fileURLToPath(import.meta.url)
                        // new Worker(fileURLToPath(import.meta.url), data);
                        // 
                        threadedPool.push(new Worker(filepath, data));
                    }
                    resolve({ server, threadedPool });
                }.bind(this, server, threadedPool));

            }
        } catch (e) {
            reject(e);
        }
    });
}

export default { ThreadedAsync, Threaded };

