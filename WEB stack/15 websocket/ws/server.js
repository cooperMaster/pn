const http = require('http');
const io = require('socket.io');

//1 http服务
let httpServer = http.createServer();
httpServer.listen(8000);

//2 ws服务
let wsServer = io.listen(httpServer);
wsServer.on('connection', s =>{
    s.on('h', function (...arg) {
        console.log(...arg);
    });
});