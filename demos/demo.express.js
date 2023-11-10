import * as http from "node:http";
import * as https from "node:https";
import express from "express";
import Threaded from "../index.js";

const app = express();

http.createServer(app).listen(3000);
// https.createServer(app).listen(3001);

Threaded(10, "localhost", 3000, app, "express");


