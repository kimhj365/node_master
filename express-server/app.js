const fs = require('fs');           // fs 모듈 호출
const express = require('express'); // express 모듈 호출
const app = express();              // 관리하는 객체

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