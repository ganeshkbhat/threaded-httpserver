/** 
 * 
 */

import * as http from "node:http";
import * as https from "node:https";
import {  } from "node:cluster";
import {  } from "node:child_process";
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

