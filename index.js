/** 
 * 
 */

import { Threaded, ThreadedAsync, default as threading } from "./src/threads.js";
import { Processes, ProcessesAsync, default as processing } from "./src/processes.js";


export default {
    threading,
    processing
};

export const MultiThreaded = Threaded;
export const MultiThreadedAsync = ThreadedAsync;
export const MultiProcess = Processes;
export const MultiProcessAsync = ProcessesAsync;

