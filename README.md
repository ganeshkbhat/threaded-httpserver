# threaded-httpserver
threaded-httpserver provides support for threaded server

multi-processing and multi-threaded http servers that provides support for express, https, https servers.  

This is a linux only port and windows system may not work due to this implementation depending on 'file descriptor os functionality in linux'.

- Run command `threadinghttp framework /folderpath concurrency host port` [allowed options http, express, koa, fastify]
- find the needed files in the folder folderpath.
- Make changes to your server application needed to run in template_server.js, and frameworkname.js files
- You will find all demos in the [demos folder as well](https://github.com/ganeshkbhat/threaded-httpserver/tree/main/demos)


#### USAGE:

`express.js` file


```
import { default as express } from "express";
import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";

export let server = express();
server.get("/", function (req, res, next) {
    res.writeHead(200);
    res.end(`Custom Application: Hello World! (threadId: ${threadId})\n`);
});

export default server;
```


`template_thread_server.js` file that is used for the implementation


```
import * as http from "node:http";
import * as https from "node:https";
import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";
import { default as express } from "express";
import { default as fastify } from "fastify";
import { default as koa_router } from "koa-router";
import { default as koa } from "koa";
import { default as serverexpress } from "./express.js";
import { default as serverkoa } from "./koa.js";
import { default as serverfastify } from "./fastify.js";

let server;
let listener;

if (workerData.framework === "express") { server = serverexpress; }
if (workerData.framework === "koa") { server = serverkoa; }
if (workerData.framework === "fastify") { server = serverfastify; }

/** @type {http.RequestListener} */
listener = listener || function (req, res) {
    res.writeHead(200);
    res.end(`Template: Hello World! (threadId: ${threadId})\n`);
};

if (!isMainThread) {
    http.createServer(workerData?.framework !== "koa" ? listener : listener.callback).listen(workerData.handle, () => {
        console.log(`Listening on http://${workerData.host}:${workerData.port}/ (threadId: ${workerData.threadId})`);
    });
}
```

`multithreaded-server.js` the actual implementation.


```
import * as http from "node:http";
import * as https from "node:https";
import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";
import { availableParallelism } from "node:os";
import { fileURLToPath } from "node:url";
import * as os from "node:os";
import { default as server } from "./express.js";

import { MultiThreaded, MultiThreadedAsync } from "../index.js";
import * as path from "node:path";


function thread() {
    var listener = server;
    var srv = MultiThreadedAsync(path.join("..\\demos\\template_thread_server.js"), 10, { host: "localhost", port: 3000, listener: listener }, "express");
    srv.then(console.log);
}

thread();

```

TODO: fastify, koa. Testers needed for other frameworks (testing missing and expected). 
