// app.js
// 모듈
require('dotenv').config({ path : './db/dbSetting.env'})
const express = require('express');
const app = express();
const mysql = require('./db.js');

// 미들웨어
// application/json => json 형태
app.use(express.json());
// application/x-www-form-urlencoded => queryString 형태
app.use(express.urlencoded({extended : false}));

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
app.get('/users/:id', async (req, res) => {
    let userId = req.params.id;
    let info = (await mysql.executeQuery('userInfo', userId))[0];
    res.json(info);
});

// 등록
app.post('/users', async (req, res) => {
    let data = req.body.param;
    let result = await mysql.executeQuery('userInsert', data);
    res.json(result);
});

// 수정
app.put('/users/:id', async (req, res) => {
    let result = await updateAll(req);
    res.json(result);
});

async function updateAll(request){
    let data = [ selectedInfo(request.body.param), request.params.id];
    let result = await mysql.executeQuery('userUpdateAll', data);
    return result;
}

function selectedInfo(obj){
    let delData = ["user_id", "user_no"];
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
    let data = [...getInfo(request.body.param), request.params.id];
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

// 삭제
app.delete('/users/:id', async (req, res) => {
    let userId = req.params.id;
    let result = await mysql.executeQuery('userDelete', userId);
    res.json(result);
});