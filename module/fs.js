// fs 모듈 : 파일 시스템 모듈(파일 읽기, 쓰기)
const fs = require('fs');
const data = 'Hello, Node.js World!';

// 파일 쓰기
// fs.writeFile('./sample.txt', data, 'utf-8', (err) => {
//     if(err) throw err;
//     console.log('job complete');
// });

// 파일 읽기
fs.readFile('./sample.txt', 'utf-8', (err, data) => {
    if(err) throw err;
    console.log(data);
})