/** 
 * 
 */

import * as http from "node:http";
import * as https from "node:https";
import cluster from "node:cluster";
// import { } from "node:child_process";
import { dirname, normalize } from "path";
import { fileURLToPath } from "url";
import { availableParallelism } from "node:os";
import { fileURLToPath } from "node:url";
import * as os from "node:os";


/**
 *
 *
 * @export
 * @param {*} filepath
 * @param {*} num
 * @param {*} host
 * @param {*} port
 * @param {*} listener
 * @param {string} [framework="http"]
 * @return {*} 
 */
export function Processes(filepath, num, host, port, listener, framework = "http") {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const cpuCount = os.cpus().length;
    let processPool = [];

    // console.log(`The total number of CPUs is ${cpuCount}`);
    // console.log(`Primary pid=${process.pid}`);
    cluster.setupPrimary({
        // exec: __dirname + filepath,
        exec: normalize(filepath),
    });

    for (let i = 0; i < cpuCount; i++) {
        processPool.push(cluster.fork());
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} has been killed`);
        console.log("Starting another worker");
        processPool.filter((w) => w.process.pid !== worker.process.pid)
        cluster.fork();
    });

    return { cluster, processPool };
}

/**
 *
 *
 * @export
 * @param {*} filepath
 * @param {*} num
 * @param {*} host
 * @param {*} port
 * @param {*} listener
 * @param {string} [framework="http"]
 * @return {*} 
 */
export function ProcessesAsync(filepath, num, host, port, listener, framework = "http") {
    return new Promise(function (resolve, reject) {
        try {

        } catch (e) {
            reject(e);
        }
    });
}

export default { Processes, ProcessesAsync };

