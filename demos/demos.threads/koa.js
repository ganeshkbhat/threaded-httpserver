import { default as express } from "express";
import { default as fastify } from "fastify";
import { default as koa_router } from "koa-router";
import { default as koa } from "koa";
import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";

export let server = new koa({
    proxy: true, proxyIpHeader: 'X-Real-IP' 
});
var _ = koa_router();              //Instantiate the router

// server.use(async (ctx, next) => {
//     await next()
//     ctx.assert.equal('object', typeof ctx.body, 500, 'some dev did something wrong')
// });

// server.use(async ctx => {
//     // ctx; // is the Context
//     // ctx.request; // is a Koa Request
//     // ctx.response; // is a Koa Response
// });

function* getMessage() {
    this.body = `Custom Application: Hello World! (threadId: ${threadId})\n`;
};

_.get("/", getMessage);
_.get("/test",  async function* (ctx) {
    ctx.response.status = 200;
    ctx.body = `Custom Application: Hello World - test Route! (threadId: ${threadId})\n`;
});

server.use(_.routes());   

server.on('error', err => {
    log.error('server error', err)
});

export default server;

