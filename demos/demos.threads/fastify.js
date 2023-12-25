import { default as express } from "express";
import { default as fastify } from "fastify";
import { default as koa_router } from "koa-router";
import { default as koa } from "koa";
import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";

export let server = fastify({
    logger: true,
    requestTimeout: 30000, // 30 seconds
});

server.get('/', function (request, reply) {
    reply.send(`Custom Application: Hello World - test Route! (threadId: ${threadId})\n`)
})

export default server;

