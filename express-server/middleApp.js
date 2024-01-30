// app.js 대신 사용
const express = require('express');     // express 모듈 불러오기
const session = require('express-session');
const cors = require('cors');
const app = express();

// body-parser 기능 사용
// : 익스프레스에 내장됨 -> 선언 없이 사용
// application/x-www-form-urlencoded
const defaultParser = express.urlencoded({extended : false});       // 일반적 기능만 사용(확장X)

// application/json
// 사용하지 않으면 대응 못함 -> json 안써도 parser 등록해줘야함
const jsonParser = express.json();

// 1) 모든 라우팅에 미들웨어 적용
// app.use(defaultParser).user(jsonParser);
//app.use(defaultParser);
app.use(jsonParser);

// 2) 특정 라우팅에 미들웨어 적용
// get 방식: query
app.get('/search', defaultParser, (req, res) => {
    let data = req.query.keyword;
    res.send(data + ', 검색결과');
})
// /search?keyword=${value}

// post 방식: body
app.post('/info', defaultParser, (req, res) => {
    let data = req.body.name;
    res.send('welcome, ' + data);
});
// /info => method: post, body: name=${value}

app.post('/message', (req, res) => {
    let data = req.body.param;
    res.send(data.title + ', ' + data.content);
});
// /message => method: post, body: {"param": {"title" : __, "content": __}}

// 서버 연결(리스너)
app.listen(5000, () => {
    console.log('Server Start');
})

let sessionSetting = session({
    secret : 'Have$A!@Nice_day',    // 하드코딩 X
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly : true,    // 통신할때만 쿠키 접근 허용(JS통해서 X)
        secure : false,     // https 일때만 동작
        maxAge : 60000      // 쿠키 유효기간(ms) / 임의로 제거 안하면 계속 살아있음
    }
});

app.use(sessionSetting);

app.post('/login', (req, res) => {
    const { id, pwd } = req.body;   // 비밀번호는 세선에 담으면 X
    if(!req.session.isLogin){
        req.session.user = id;
        req.session.isLogin = true;
    }
    req.session.save((err) => {
        if(err) throw err;
        res.redirect('/');
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// cors
const corsOptions = {
    origin : 'http://127.0.0.1:5500',   // cors origin 등록
    optionsSuccessStatus : 200  // 레거시 브라우저에서 인식할때 상태코드
};

app.use(cors(corsOptions));

// 라우팅: 미들웨어 다음에 위치해야 적용됨
app.get('/', (req, res) => {
    res.json(req.session);
});
/**
 * HTTP => request / response
 * header : 통신정보
 * body : 데이터(get이면 body X)
 * 
 * Content-Type: header에 있음
 *               내가 보내는 데이터의 포맷 알려주는것
 *               보내는 데이터 포맷과 불일치시 서버 오류(자동 파싱X)
 *               
 * token : 권한 체크하는 것
 *         데이터 X / 헤더에 들어감
 *         API등에서 토큰 요구시 클라이언트가 request header에 토큰 넣어 보냄
 * 
 * 
 * 
 */