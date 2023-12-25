import * as http from "node:http";
import * as https from "node:https";
import { isMainThread, Worker, workerData, threadId } from "node:worker_threads";
import { availableParallelism } from "node:os";
import { fileURLToPath } from "node:url";
import * as os from "node:os";
import { default as server } from "./fastify.js";

import { default as Threaded } from "../index.js";
import * as path from "node:path";

var listener = server;

Threaded(path.join("C:\\Users\\ganes\\OneDrive\\Documents\\projects\\threaded\\demos\\serverfile.js"), 10, "localhost", 3000, listener, "fastify");

