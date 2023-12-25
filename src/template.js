import * as path from 'node:path';
import * as fs from "node:fs";

// srv fm:::express d:'/path/test' c:'10' h:'localhost' p:'3000'

// https://nodejs.org/en/learn/command-line/accept-input-from-the-command-line-in-nodejs

// const readline = require('node:readline').createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   readline.question(`What's your name?`, name => {
//     console.log(`Hi ${name}!`);
//     readline.close();
//   });

// Get process args from command line:
// framework: 
// directory path:  
// concurrency:
// host:
// port: 

let server_filename = path.normalize("./expresses.js");

fs.writeFileSync(server_filename, `
import { default as express } from "express";
import { default as fastify } from "fastify";
import { default as koa_router } from "koa-router";
import { default as koa } from "koa";
import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";

export let server = express();
server.get("/", function (req, res, next) {
    res.writeHead(200);
    res.end(\`Custom Application: Hello World! (threadId: \${threadId})\n\`);
});

export default server;
`);

// fs.writeFileSync(server_filename, `
// import { default as express } from "express";
// import { default as fastify } from "fastify";
// import { default as koa_router } from "koa-router";
// import { default as koa } from "koa";
// import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";

// export let server = new koa({
//     proxy: true, proxyIpHeader: 'X-Real-IP' 
// });

// //Instantiate the router
// var _ = koa_router();              

// function* getMessage() {
//     this.response.status = 200;
//     this.body = \`Custom Application: Hello World! (threadId: \${threadId})\n\`;
// };

// _.get("/", getMessage);

// //_.get("/test",  async function* (ctx) {
// //    ctx.response.status = 200;
// //    ctx.body = \`Custom Application: Hello World - test Route! (threadId: \${threadId})\n\`;
// //});

// server.use(_.routes());   

// server.on('error', err => {
//     log.error('server error', err)
// });

// export default server;
// `);


// fs.writeFileSync(server_filename, `
// import { default as express } from "express";
// import { default as fastify } from "fastify";
// import { default as koa_router } from "koa-router";
// import { default as koa } from "koa";
// import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";

// export let server = fastify({
//     logger: true,
//     requestTimeout: 30000, // 30 seconds
// });

// server.get('/', function (request, reply) {
//     reply.send(\`Custom Application: Hello World - test Route! (threadId: \${threadId})\n\`)
// })

// export default server;
// `);

// fs.writeFileSync(server_filename, `
// import { default as express } from "express";
// import { default as fastify } from "fastify";
// import { default as koa_router } from "koa-router";
// import { default as koa } from "koa";
// import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";


// export default server;
// `);

fs.writeFileSync(template_filename, `
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
    res.end(\`Template: Hello World! (threadId: \${threadId})\n\`);
};

if (!isMainThread) {
    http.createServer(workerData?.framework !== "koa" ? listener : listener.callback).listen(workerData.handle, () => {
        console.log(\`Listening on http://\${workerData.host}:\${workerData.port}/ (threadId: \${workerData.threadId})\`);
    });
}
`);


