import * as http from "node:http";
import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";
import { availableParallelism } from "node:os";
import { fileURLToPath } from "node:url";
import * as os from "node:os";

export function Threaded(filepath, num, host, port, listener, framework = "http") {
    let threadedPool = [];
    host = host || "locahost";
    port = port || 9000;

    // /** @type {http.RequestListener} */
    // listener = !!listener ? listener : function (req, res) {
    //     res.writeHead(200);
    //     res.end(`Default: Hello World! (threadId: ${threadId})\n`);
    // };

    if (isMainThread) {
        let server = framework !== "koa" ? http.createServer(listener) : http.createServer(listener);

        return { server.listen(port, host, function () {
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
        }.bind(this, server, threadedPool)), 
        threadedPool
    };
    }
}

export default Threaded;
// module.exports = Threaded;

