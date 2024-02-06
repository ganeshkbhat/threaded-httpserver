import * as http from "node:http";
import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";
import { availableParallelism } from "node:os";
import { fileURLToPath } from "node:url";
import * as os from "node:os";

export function MultiThread() {
    const host = "locahost";
    const port = 9000;
    const framework = "http";
    const num = 10;

    /** @type {http.RequestListener} */
    const listener = function (req, res) {
        res.writeHead(200);
        res.end(`Hello World! (threadId: ${threadId})\n`);
    };

    if (isMainThread) {
        const server = framework !== "koa" ? http.createServer(listener) : http.createServer(listener.callback());
        server.listen(port, () => {
            console.log(`Listening on http://${host}:${port}/ (threadId: ${threadId})`);
            const maxWorkers = num || (availableParallelism() - 1);

            for (let i = 0; i < maxWorkers; i++) {
                let data;
                if (os.type() === "Windows_NT") {
                    data = { workerData: { handle: { port: server._handle.port }, num, host, port } };
                } else {
                    data = { workerData: { handle: { port: server._handle.port }, num, host, port } };
                }
                new Worker(fileURLToPath(import.meta.url), data);
            }
        });
    } else {
        http.createServer(workerData.framework !== "koa" ? workerData.listener : workerData.listener.callback()).listen(workerData.handle, () => {
            console.log(`Listening on http://${host}:${port}/ (threadId: ${threadId})`);
        });
    }
}

// MultiThread();
export default MultiThread;

