// path 모듈: 파일, 디렉토리 경로 작업
//            운영체제 별 파일경로 방식 다름 (윈도우 \, 리눅스 /)
const path = require('path');

console.log('==절대경로');
console.log(__filename);    // 현재 파일 절대 경로
console.log(__dirname);     // 현재 폴더 절대 경로
console.log('실제 파일명 : ', path.basename(__filename));   // 경로의 마지막 부분
console.log('확장자', path.extname(__filename));            // 파일 확장자

let pathList = process.env.PATH.split(path.delimiter);  // 환경변수 path 정보 구분자로 자르기
console.log(path.delimiter);   // 환경변수 구분자(;)
console.table(pathList);       // 경로구분자 \ + 특수문자 인식 \ -> \\
console.log(path.sep);         // 경로 구분자(\)
console.log(pathList[2].split(path.sep));