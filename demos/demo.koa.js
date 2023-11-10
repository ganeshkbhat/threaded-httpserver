
import * as http from "node:http";
import * as https from "node:https";
import Koa from "koa";
import Threaded from "../index.js";

const app = new Koa();

// http.createServer(app.callback()).listen(3000);
// https.createServer(app.callback()).listen(3001);

Threaded(10, "localhost", 3000, app, "koa")
