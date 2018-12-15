const http =  require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
    fs.readFile( `dddd${req.url}`, (err,data) =>{
        if(err){
            // res.writeHeader(404);
            // res.write('NOT FOUND');
            fs.readFile('dddd/404.html',(err, data) => {
                console.log(err);
                console.log(data);
                if (err){
                    res.writeHeader(404);
                    res.write('NOT FOUND');
                } else {
                    res.write(data);
                    res.end();
                }
            });
        }else {
            res.write(data);
            res.end();
        }

    });
});

server.listen(8888);
console.log("服务器已启动，监听端口8888");