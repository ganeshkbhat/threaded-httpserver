# threaded-httpserver
threaded-httpserver provides support for threaded server

multi-processing and multi-threaded http servers that provides support for express, https, https servers.  

This is a linux only port and windows system may not work due to this implementation depending on 'file descriptor os functionality in linux'.

- Run command `threadinghttp framework /folderpath concurrency host port` [allowed options http, express, koa, fastify]
- find the needed files in the folder folderpath.
- Make changes to your server application needed to run in template_server.js, and frameworkname.js files
- You will find all demos in the [demos folder as well](https://github.com/ganeshkbhat/threaded-httpserver/tree/main/demos)


TODO: fastify, koa. Testers needed for other frameworks (testing missing and expected). 
