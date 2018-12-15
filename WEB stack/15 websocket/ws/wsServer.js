const http = require('http');
const fs = require('fs');
const io = require('socket.io');
const mysql = require('mysql');
const db = require('./mysqljs').db;

let httpServer = http.createServer((req, res) => {
    fs.readFile(`www${req.url}`, (err, data) => {
        if (err){
            res.writeHeader(404);
            res.write('NOT FOUND');
        } else {
            res.write(data);
        }
        res.end();
    });
});
httpServer.listen(8888);

let aSocket = [];
let wsServer = io.listen(httpServer);
wsServer.on('connection', s => {
    aSocket.push(s);

    //注册
    s.on('reg', (user, pass) => {
        //校验user pass 是否符合业务规则
        //若不符合s.emit('reg_ret',1,'xxx不符合规范');
        if (user.length < 3  ){
            s.emit('reg_ret',1,'用户名不符合规范');
        }else if (pass.length < 3) {
            s.emit('reg_ret',1,'密码不符合规范');
        } else{
            //校验用户是否存在
            db.query(`select id from user where username='${user}'`,(err, data) => {
                if (err){
                    console.log(err);
                    s.emit('reg_ret',1,'数据库异常');
                }else {
                    if (data.length > 0){
                        s.emit('reg_ret',1,'用户已经存在');
                    } else {
                        db.query(`insert into user(username,password,online) values('${user}','${pass}',0)`, (err, data) => {
                            if (err) {
                                s.emit('reg_ret',1,'数据库异常');
                            } else {
                                s.emit('reg_ret',0,'注册成功');
                            }
                        });
                    }

                }
            });
        }

    });

    let currr_id;
    let curr_user;
    //登陆
    s.on('login',(user, pass) => {
        //校验user pass 是否符合业务规则
        //若不符合s.emit('reg_ret',1,'xxx不符合规范');
        if (user.length < 3  ){
            s.emit('login_ret',1,'用户名不符合规范');
        } else if (pass.length < 3) {
            s.emit('login_ret',1,'密码不符合规范');
        } else {
            db.query(`select id,username from user where username= '${user}' and password = '${pass}' `, (err, data) => {
                if (err) {
                    s.emit('login_ret',1,'数据库有误');
                } else {
                    if(data.length == 0) {
                        s.emit('login_ret',1,'用户名或密码有误');
                    } else {
                        db.query(`update user set online=1 where username = '${user}' `,(err, data) => {
                            if (err) {
                                s.emit('login_ret',1,'数据库有误' );
                            } else {
                                s.emit('login_ret',0,'登录成功');


                            }
                        });
                        console.log(data);
                        currr_id = data[0].id;
                        curr_user = data[0].username;
                        console.log(curr_user +'登录');
                    }
                }
            });
        }
    });

    //发言
    s.on('msg', txt => {
        console.log(txt);
        if (!txt.trim()) {
            s.emit('msg_ret', 1, '消息不能为空');
            return;
        }
        
        aSocket.forEach(item => {
            if (item != s) {
                item.emit('msg', curr_user, txt);
            }
        });

        s.emit('msg_ret', 0, '消息已发送');
        console.log(`${txt},消息已发送`);
    });


    //离线
    s.on('disconnect', () => {
        console.log('disconnect' + currr_id);
        db.query(`update user set online=0 where id = ${currr_id} `, err => {
            if (err) {
                console.log('数据库有误 ' + err);
            }
            currr_id = 0;
            console.log(curr_user +'离开');
            curr_user = '';
        });

        //上传当前的socket
        aSocket.filter(item => item != s);
    });



});

console.log('服务器已启动，监听端口8888');