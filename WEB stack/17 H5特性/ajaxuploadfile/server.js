let express = require('express');
const multer=require('multer');
const multerObj=multer({dest: 'data'});
let server = express();
server.listen(8000);

server.use(multerObj.any());

server.post('/upload',(req,res) => {
    console.log(req.headers);
    if(req.headers['origin']=='null' || req.headers['origin'].startsWith('http://localhost')){
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
    console.log(req.files);
    res.send('ok');
});

//将html用使用的端口打开，解决跨域 如http://localhost:8000/1.html
server.use(express.static('./www/'));