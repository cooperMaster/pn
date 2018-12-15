const mysql = require('mysql');

const host = '192.168.0.105';
const port = '3306';
const user = 'root';
const password = 'mysql';
const database = 'IM';
let db = mysql.createPool({host, port, user, password, database});

// db.query('select * from user', (err, data) => {
//     if (err){
//         console.log('failure '+ err);
//     } else {
//         console.log(data);
//     }
// });

exports.db = db;