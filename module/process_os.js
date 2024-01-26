// * 모듈 로드하는 코드는 맨 위로 올려놓기(실제 사용 위치와 상관없이)
const process = require('process');
const os = require('os');

console.log(process.env);
console.log('=================================================================================================================================');
console.log(os.cpus());
console.log(os.tmpdir());