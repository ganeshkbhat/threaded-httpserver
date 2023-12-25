import * as http from "node:http";
import * as https from "node:https";
import { MultiThreaded, MultiThreadedAsync } from "../index.js";

MultiThreaded(10, { host: "localhost", port: 3000, listener: listener });

