const fs = require('fs');                   // fs 모듈 불러오기
const express = require('express');         // express 모듈 불러오기
const userRouter = require('./user.js');    // userRouter 불러오기(모듈X -> 파일로 인식)
const app = express();                      // 관리하는 객체

// middleware
// --Request Data Process

// application/json
app.use(express.json({
    limit: '50mb'
}));

// application/x-www-form-urlencoded
app.use(express.urlencoded({extended : false}));

// Error
app.use(function(err, req, res, next){
    console.log(err);
    res.status(500).json({statusCode : res.statusCode,
                         errMessage: err.errMessage});
});


app.get('/defaultErr', (req, res) => {
    throw new Error('기본 핸들러 동작');
});

app.get('/customErr', (req, res) => {
    next(new Error('Process Fail! Check Data!'));
})

// Data Loading
const jsonFile = fs.readFileSync('./db.json');
const jsonData = JSON.parse(jsonFile);

// static
app.use(express.static('./files'));
app.use('/public', express.static('./files'));

// DB 접속 쿼리문
const getData = (target, where) => {
    let data = jsonData[target];
    if(Array.isArray(data)){
        let list = data;
        for(let obj of list){
            if(obj.id == where){
                data= obj;
            }
        }
    }
    return data;
}

// user 관련한 모든 라우팅은 /user로 시작함
// 서버 라우터를 들고올때 라우팅 정보 매핑함
// * app.js 파일 길이 많이 늘리지 말기... => 라우터 파일 분리 하기
app.use('/user', userRouter);

// 서버 실행
app.listen(3000, () => {
    console.log('Server Start');
});

app.get('/', (req, res) => {
    res.send('Hello, Express.js World!');
});

// 전체조회
app.get('/posts', (req, res) => {
    let data = getData('posts');
    res.json(data);
});

// 단건조회
app.get('/posts/:id', (req, res) => {
    let postId = req.params.id;     // 콜론 사용하여 파라미터 정의
    let data = getData('posts', postId);
    res.json(data); 
});

// 등록
app.post('/posts', (req, res) => {
    let data = req.body;
    console.log('등록', data);
    res.json(data);
});

// 수정
app.put('/posts/:id', (req, res) => {
    let postId = req.params.id;
    let data = req.body;
    console.log('수정', postId, data);
    res.json({id: postId, data});
});

// 삭제
app.delete('/posts/:id', (req, res) => {
    let postId = req.params.id;
    console.log('삭제', postId);
    res.sendStatus(203);
});

// 전체조회 - comments
app.get('/comments', (req, res) => {
    let data = getData('comments');
    res.json(data);
})

// 단건조회 - comments
app.get('/comments/:id', (req, res) => {
    let commentsId = req.params.id;
    let data  = getData('comments', commentsId);
    res.json(data);
});

// 조회 - profile
app.get('/profile', (req, res) => {
    let data = getData('profile');
    res.json(data);
});

// 검색을 포함하는 경우 -> queryString 사용 고려
app.get('/search', (req, res) => {
    let keywords = req.query;
    console.log('검색조건 구성', keywords);
    res.json(keywords)
})

/*
20240130 1교시

1.
js서버: 파일 자체 수정 가능
fs 모듈 기반 -> 사용자가 데이터 조작 일으키면 DB역할하는 json 파일에 덮어씌움

2.
errer handler: 따로 등록 안하면 내장된 기본 핸들러가 동작됨
express.js 에선 등록된 페이지가 상태에 맞게 출력됨
직접 상태 페이지 수정 가능

3.
라우팅: 메소드, 경로 기반한 클라이언트 요청
값 가져오는 방법 3가지
1) params : 경로에 붙는 매개변수
2) body field : body안에 작성
3) queryString: 자료 계층 표현 못함

4.
queryString : 객체 배열

5.
응답 메소드(response)
ex) res.send(): 다양한 유형의 응답 전송
통신이 자동으로 끊어지지 않음 -> 응답 안오면 계속 기다림
-> 항상 종료 생각해야함

6. 라우트
1) app.route : 한 경로 기준으로 라우트 메소드 처리
               같은 경로인데 get/post/... 구분해서 처리(모듈식)
2) express.route : 라우트 처리를 여러 파일로 분리해서 구현
                   다수의 라우트 유지보수 편리
                   
*/