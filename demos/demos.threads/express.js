import { default as express } from "express";
import { default as fastify } from "fastify";
import { default as koa_router } from "koa-router";
import { default as koa } from "koa";
import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";

export let server = express();
server.get("/", function (req, res, next) {
    res.writeHead(200);
    res.end(`Custom Application: Hello World! (threadId: ${threadId})\n`);
});

export default server;

