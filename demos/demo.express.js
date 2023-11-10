const http = require('http');
const http = require('https');
const express = require('express');
const app = express();

http.createServer(app).listen(3000);
https.createServer(app).listen(3001);
