let data = 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash';

// 레거시 API
const url = require('url');     // url 모듈 불러옴
let legacy = url.parse(data);   // parse 지원 끊김
console.log(legacy);            // legacy 객체 출력

// WHATWG(웹표준) API
const whatwg = new URL(data);   //URL 객체 생성
console.log(whatwg);
console.log(whatwg.searchParams instanceof URLSearchParams);
console.log(whatwg.searchParams.get('query'));
// => origin 개념 추가(웹 보안 기준)
// query 빠지고 searchParams(클래스)
// query :  fetch랑 함께 사용 못함
// URLSerachParams : queryString??

