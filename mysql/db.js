// db.js
const mysql = require('mysql');
const sql = require('./db/customerSql.js');
// sql.customerList

// connection pool 생성
// 기본값: 오토커밋
const connectionPool = mysql.createPool({
    host : '127.0.0.1',
    port : '3306',
    user : 'dev01',
    password : '1234',
    database : 'dev',
    connectionLimit : 10,
    debug : true
});

// ★★★쿼리 실행 메소드★★★
// values : 
// async : promise 동작하는데 그 결과(return값)를 기다리겠다
// 알아두기 :
// 1) async 쓰는 이유 
// 2) Promise 쓰는 이유
// 3) SQL문 대괄호로 받아오는 이유
const executeQuery = async (alias, values) => {
    return new Promise((resolve, reject) => {
        let executeSql = sql[alias];    // SQL문 넘어옴
        connectionPool.query(executeSql, values, (err, results) => {
            // err: 쿼리문 자체 에러 / 넘겨받을 때 에러
            if(err){
                console.log(err);
                reject({err});
            }
            // results: SELECT문 => 배열 / DML문 => 객체
            // 사용자가 한건만 받아야 할때는 별도로 작업 필요함(MySQL: 단건/전체 조회 구분X)
            else{
                console.log(results);
                resolve(results);
            }
        });
    })
}

module.exports = {
    executeQuery
}

/**
 * 외부 DB와 연결하는 경우 Promise로 연결함(비동기)
 * 원래 라우팅으로 연결해야하기 때문에 동기식으로 해야함
 * 근데 모든 사이트가 동기식으로 해야하는 건 아님(사이트 성격에 따라 다름)
 * 
 * node 환경에서 실행하는 메소드는 1개만 있어도 됨
 * 쿼리문만 계속 추가
 * 
 */