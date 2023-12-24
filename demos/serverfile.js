/**
 * 
 */

import * as http from "node:http";
import * as https from "node:https";
import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";
import { default as express } from "express";
import { default as fastify } from "fastify";
import { default as koa_router } from "koa-router";
import { default as koa } from "koa";

let server;
let listener;

if (workerData?.framework === "express") {
    server = import("./express.js").server;
}

if (workerData?.framework === "koa") {
    server = import("./koa.js").server;
}

if (workerData?.framework === "fastify") {
    server = import("./fastify.js").server;
}


/** @type {http.RequestListener} */
listener = listener || function (req, res) {
    res.writeHead(200);
    res.end(`Template: Hello World! (threadId: ${threadId})\n`);
};

if (!isMainThread) {
    http.createServer(workerData?.framework !== "koa" ? listener : listener).listen(workerData.handle, () => {
        console.log(`Listening on http://${workerData?.host}:${workerData?.port}/ (threadId: ${threadId})`);
    });
}

