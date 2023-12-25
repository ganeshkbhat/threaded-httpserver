import supertest from 'supertest'; // Import supertest
import { default as server } from "./express.js";

import { default as chai } from 'chai';
import { default as chaiHttp } from 'chai-http';

chai.use(chaiHttp);

import { MultiThreaded, MultiThreadedAsync } from "../index.js";
import * as path from "node:path";
import { default as loadtest } from 'loadtest';
import { default as should } from 'should';


describe("Performance Test", function () {
    var noRequestPerHour = 100000;
    var avgRequestTime = 1000;
    var server;

    beforeAll(async (done) => {
        let res = await MultiThreadedAsync(path.join("../demos/template_server.js"), 10, { host: "localhost", port: 3000, listener: server }, "express");
        server = res.server;
        // done();
    });

    it("performance testing GET path - /", function (done) {
        this.timeout(1000 * 60);
        var options = {
            "url": 'http://localhost:3000/',
            "maxSeconds": 30,
            "concurrency": 25,
            "statusCallback": statusCallback
        };
        var gLatency;
        function statusCallback(latency, result, error) {
            gLatency = latency;
        }
        var operation = loadtest.loadTest(options, function (error) {
            if (error) {
                console.error('Got an error: %s', error);
            } else if (operation.running == false) {
                console.info("\n==============================\n");
                console.info("Requests per hour: " + noRequestPerHour)
                console.info("Avg request time(Millis): " + avgRequestTime)
                console.info("\n==============================\n")
                console.info("Total Requests :", gLatency.totalRequests);
                console.info("Total Failures :", gLatency.totalErrors);
                console.info("Requests/Second :", gLatency.rps);
                console.info("Requests/Hour :", (gLatency.rps * 3600));
                console.info("Avg Request Time:", gLatency.meanLatencyMs);
                console.info("Min Request Time:", gLatency.minLatencyMs);
                console.info("Max Request Time:", gLatency.maxLatencyMs);
                console.info("Percentiles :", gLatency.percentiles)
                console.info("\n===============================\n")
                gLatency.totalErrors.should.equal(0);
                (gLatency.rps * 3600).should.be.greaterThan(noRequestPerHour);
                (gLatency.meanLatencyMs).should.be.below(avgRequestTime);
                done();
            }
        });
    });
});
