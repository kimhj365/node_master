// app.js

// 모듈
const express = require('express');
const app = express();
const mysql = require('./db.js');

// 미들웨어
app.use(express.json());

// listen 메소드
app.listen(3000, () => {
    console.log('Server Start, http://localhost:3000');
});

// 라우팅
// 조회(전체)
app.get('/users', async (req, res) => {
    let list = await mysql.executeQuery('userList');
    res.json(list);
});

// 조회(단건)
app.get('/users/:no', async (req, res) => {
    let userNo = req.params.no;
    let info = (await mysql.executeQuery('userInfo', userNo))[0];
    res.json(info);
});

// 등록
app.post('/users', async (req, res) => {
    let data = req.body.param;
    let result = await mysql.executeQuery('userInsert', data);
    res.json(result);
});

// 수정
app.put('/users/:no', async (req, res) => {
    let result = await updateAll(req);
    res.json(result);
});

app.put('/users/:no', async (req, res) => {
    let result = await updateInfo(req);
    res.json(result);
});

async function updateAll(request){
    let data = [ selectedInfo(request.body.param), request.params.no];
    let result = await mysql.executeQuery('userUpdateAll', data);
    return result;
}

function selectedInfo(obj){
    let delData = ["user_no", "email"];
    let newObj = {};
    let isTargeted = null;
    for(let field in obj){
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
    let data = [...getInfo(request.body.param), request.params.no];
    let result = await mysql.executeQuery('userUpdateInfo', data);
    return result;
}

function getInfo(obj){
    let getData = ["user_id", 'user_pwd', "user_name"];
    let newAry = [];
    for(let target of getData){
        for(let field in obj){
            if(field == target){
                newAry.push(obj[field]);
                break;
            }
        }
    }
    return newAry;
};