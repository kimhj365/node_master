// * 모듈 로드하는 코드(require, import) 맨 위로 올려놓기(실제 사용 위치와 상관없이)
const process = require('process'); // process 모듈: Node.js 프로세스 정보, 제어
const os = require('os');           // os 모듈: 운영체제 관련 함수, 속성

console.log(process.env);   // 사용자 환경 객체 반환
console.log('=================================================================================================================================');
console.log(os.cpus());     // 컴퓨터 CPU 코어정보
console.log(os.tmpdir());   // 임시파일 저장 경로