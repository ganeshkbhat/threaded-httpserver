import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

class MultiThread {

  static async runThread(threadFunction, data) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, { workerData: data });

      worker.on('message', (result) => {
        resolve(result);
      });

      worker.on('error', (err) => {
        reject(err);
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  }

  static async runThreads(threadFunction, dataArray) {
    const threadPromises = [];

    for (const data of dataArray) {
      threadPromises.push(MultiThread.runThread(threadFunction, data));
    }

    return Promise.all(threadPromises);
  }
  
}

if (!isMainThread) {
  const { threadFunction } = workerData;
  threadFunction(workerData.data);
}

export default MultiThread;
