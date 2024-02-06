Extract multi threading into a common and different node.js file

I am trying to convert the following code into a different file but unable to do it cleanly.What is going wrong here:

```
import * as http from "node:http";
import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";
import { availableParallelism } from "node:os";
import { fileURLToPath } from "node:url";

/** @type {http.RequestListener} */
const listener = (req, res) => {
    res.writeHead(200);
    res.end(`Hello World!(threadId: ${ threadId }) \n`);
};

if (isMainThread) {
    const server = http.createServer(listener);
    server.listen(8000, () => {
        console.log(`Listening on http://localhost:${8000}/ (threadId: ${threadId})`);

const maxWorkers = availableParallelism() - 1;

for (let i = 0; i < maxWorkers; i++) {
    new Worker(fileURLToPath(import.meta.url), {
        workerData: { handle: { fd: server._handle.fd } }
    });
}
    });
} else {
    http.createServer(listener).listen(workerData.handle, () => {
        console.log(`Listening on http://localhost:${8000}/ (threadId: ${threadId})`);
    });
}
```

This is the converted code:

```

    ```


