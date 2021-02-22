const dbConfig = require('../config').dbConfig;
const mysql = require('mysql');

function http(sql, params = [], conConfig = {}) {
    return new Promise((resolve, reject) => {
        // 创建连接对象
        let con = mysql.createConnection({...dbConfig, ...conConfig});
        // 调用query函数
        con.query(sql, params, (error, results) => {
            con.end();
            if(error) reject(error);
            else resolve(results);
        });
    });
}

module.exports =  http;