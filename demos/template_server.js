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
import { default as serverexpress } from "./express.js";
import { default as serverkoa } from "./koa.js";
import { default as serverfastify } from "./fastify.js";

let server;
let listener;

if (workerData.framework === "express") {
    server = serverexpress;
}

if (workerData.framework === "koa") {
    server = serverkoa;
}

if (workerData.framework === "fastify") {
    server = serverfastify;
}

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

