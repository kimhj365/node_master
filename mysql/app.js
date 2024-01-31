// app.js
// MySQL 기반으로 서버 연결

// 모듈 불러오기
const express = require('express');
const app = express();
const mysql = require('./db.js');
// mysql.executeQuery();

// 미들웨어 등록
// application/json => json 형태
app.use(express.json());
// application/x-www-form-urlencoded => queryString 형태
app.use(express.urlencoded({extended : false}));    //확장기능 안씀
// => queryString, JSON 둘다 전역변수로 등록 => 2가지 모두 사용 가능
// but 객체 형태의 인풋값 넣으려면 JSON 사용해야 함

// listen 메소드
app.listen(3000, ()=>{
    console.log('Server Start, http://localhost:3000');
});

// 라우팅
// 전체조회
app.get('/customers', async (req, res)=>{
    // 실행 메소드 => SQl문 찾아서 입력(다른 파일에서 exports)
    // promise로 DB에서 결과 받아옴 => 응답하려면 반드시 값이 채워져 있어야 함
    // 근데 비동기 방식이라 list 값을 채우기 전에 다음 코드가 실행되어 버림 => 화면 출력 X
    // async-await 동기식으로 처리해서 res.json(list) 실행되기 전에 값 넘어오는거 확인하고 다음코드로 넘어감
    // ★ 작업 성격에 따라 동기/비동기 처리 방법 선택해야 함
    let list = await mysql.executeQuery('customerList');
    res.json(list);
});

// 단건조회
app.get('/customers/:id', async (req, res) => {
    // id 파라미터
    let customerId = req.params.id;
    // SELECT문은 단건조회도 배열로 인식
    // => await값의 0번째 인덱스값 반환 => 객체로 반환
    let info = (await mysql.executeQuery('custumerInfo', customerId))[0];
    res.json(info);
});

// 등록
app.post('/customers', async (req, res) => {
    // body의 특정 필드가 등록 대상 값(모든 필드 X) => param이라고 특정지은 대상만 등록
    let data = req.body.param;  // param 대상 == 객체( param : "param"이라는 대상 가져오려고 임의로 지은것)
    let result = await mysql.executeQuery('customerInsert', data);
    res.json(result);
});
/*
* body :
{
	"param" : 
		{
		"name" : "Kim Hyeonjun",
		"email": "khj@email.com",
		"phone": "010-1111-1111"
		}
}

* result(INSERT - auto_increment) : 
 OkPacket {
  fieldCount: 0,
  affectedRows: 1,  => 
  insertId: 2,      => auto_increment
  serverStatus: 2,
  warningCount: 0,
  message: '',      => 클라이언트한테 출력할 메세지 참고용
  protocol41: true,
  changedRows: 0    => 수정된 데이터
}
 */

// 수정
// SQL문 2개 => 개별 함수로 만들어서 교체
app.put('/customers/:id', async (req, res) => {
    let result = await updateAll(req);
    res.json(result);
});

app.put('/customers/:id', async (req, res) => {
    let result = await updateInfo(req);
    res.json(result);
});

async function updateAll(request){
    let data = [ selectedInfo(request.body.param), request.params.id];   // set절, id컬럼
    let result = await mysql.executeQuery('customerUpdateAll', data);
    return result;
}

/* 
* body:
{
	"param" : 
		{
		"id" : 2,
		"name" : "Park Jiwoong",
		"email": "pjw@email.com",
		"phone": "010-2222-2222",
		"address" : null
		}
}
* result:
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '(Rows matched: 1  Changed: 1  Warnings: 0',
  protocol41: true,
  changedRows: 1
}
 */

// 객체에서 특정 필드만 뽑아내는 방법
// => 새로운 객체 만들어서 특정 필드만 복사해서 채워넣음
function selectedInfo(obj){
    let delData = ["id", "email"];
    let newObj = {};
    let isTargeted = null;
    for(let field in obj){  // field : id, name, email, phone, address
        isTargeted = false;
        for(let target of delData){
            if(field == target){
                isTargeted = true;
                break;
            }
        }
        // 
        if(!isTargeted){
            newObj[field] = obj[field];
        }
    }
    return newObj;
};

async function updateInfo(request){
    let data = [...getInfo(request.body.param), request.params.id]; // 컬럼 : email, phone, address, id
    let result = await mysql.executeQuery('customerUpdateInfo', data);
    return result;
}

function getInfo(obj){
    let getData = ["email", 'phone', "address"];
    let newAry = [];
    for(let target of getData){  // field : id, name, email, phone, address
        for(let field in obj){
            if(field == target){
                newAry.push(obj[field]);
                break;
            }
        }
    }
    return newAry; // ["pjw@email.com", 010-2222-2222", null);
};