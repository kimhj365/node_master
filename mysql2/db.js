// db.js

// 모듈
const mysql = require('mysql');
const sql = require('./db/userSql.js')

console.dir(process.env);
// connection pool 생성
const connectionPool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port : process.env.MYSQL_PORT,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PWD,
    database : process.env.MYSQL_DB,
    connectionLimit : process.env.MYSQL_CONNECT_LIMIT
});

const executeQuery = async (alias, values) => {
    return new Promise((resolve, reject) => {
        let executeSql = sql[alias];
        connectionPool.query(executeSql, values, (err, results) => {
            if(err){
                console.log(err);
                reject({err});
            }
            else {
                console.log(results);
                resolve(results);
            }
        });
    });
};

module.exports = {
    executeQuery
}