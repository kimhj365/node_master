// express.route 라우팅 정보 등록 -> 돌려주는 파일(=모듈)
// Q. require('express')는 이미 app.js에 있는데 또 불러오는 이유
//    : 스코프가 달라서??
const express = require('express'); // express 모듈 불러옴
const router = express.Router();    // 라우팅 정보

// user/
// user/는 안에서 등록하지 않음
// app.js에 이미 같은 경로의 같은 메소드 존재 but 충돌 안남

// 공통적으로 들어가는 user/는 app.js에서 이미 정의 함
// -> 실질적 기능 들어가는 부분만 정의하면 됨

// user/
router.get('/', (req, res) => {
    res.send('회원정보 조회');
});

// user/insert
router.post('/insert', (req, res) => {
    res.send('회원 등록');
});

// user/update
router.put('/update', (req, res) => {
    res.send('회원 수정');
});

// user/delete
router.delete('/delete', (req, res) => {
    res.send('회원 삭제');
});

// 정의한 라우팅 정보 내보내기 -> require로 불러옴
module.exports = router;

/*
middleware : 요청-응답주기 사이 함수

1.적용범위:
1) app.use(middleware): 전제 라우터 적용(전역)
2) app.method(path, middleware(), handler)
 : 특정 라우터에 적용
   업로드는 미들웨어 기반으로 진행됨
   어떤 작업을 하기 전에 request 에서 작업시 필요(handler 앞에서 실행)

2. middleware 모듈
 : 내장모듈 -> require 없이 사용가능
 : http request 처리 관련 


*/