import { default as express } from "express";
import { default as fastify } from "fastify";
import { default as koa_router } from "koa-router";
import { default as koa } from "koa";
import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";

var port = 3000;
var host = "localhost";

var server = new koa();

var _ = koa_router();  
_.get('/', getMessage);  
_.get('/hello', getMessage);  
_.get('/:id', sendID);

function *sendID() {
   this.body = 'The id you specified is ' + this.params.id;
}

function *getMessage() {
   this.body = "Hello world!";
};

server.use(_.routes()); 

server.on('error', err => {
    console.error('server error', err)
});

server.listen(port, host, () => {
    console.log(`Starting koa server at port ${port}`);
})
