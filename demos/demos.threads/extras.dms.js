<<<<<<< HEAD:demos/dms.js
// import { default as MultiThread } from './tds.js';
=======
import { default as MultiThread } from './extras.tds.js';
>>>>>>> 2a20883606d7d2e6b4ac44ec40317914f833d2aa:demos/demos.threads/extras.dms.js

// // Your thread function
// const threadFunction = (data) => {
//   const result = data * 2;
//   parentPort.postMessage(result);
// };

// // Data to be passed to each thread
// const threadDataArray = [
//   { data: 1, threadFunction },
//   { data: 2, threadFunction },
//   { data: 3, threadFunction },
//   { data: 4, threadFunction },
//   { data: 5, threadFunction },
// ];

// // Use the library to run threads
// const mainFunction = async () => {
//   try {
//     const results = await MultiThread.runThreads(threadFunction, threadDataArray);
//     console.log('Results from each thread:', results);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// mainFunction();

import { default as MultiThread } from "./ts.js";
MultiThread();
