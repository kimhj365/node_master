// customerSql.js

// SQL문 입력할 수 있도록 처리
// 객체 내부에 직접 작성 or 객체 밖에서 쿼리문 만들고 불러오기
// ※ 컬럼명 반드시 소문자로 작성!(특히 CREATE문)

// 조회(전체)
let customerList =
`SELECT id
        , name
        , email
        , phone
        , address
FROM customers`;

// 조회(단건)
let custumerInfo = 
`SELECT id
        , name
        , email
        , phone
        , address
FROM customers
WHERE id = ?`;

// 등록
// MySQL의 INSERT INTO ~ SET절
// ?가 어느 컬럼인지 확인불가 => 객체
let customerInsert = 
`INSERT INTO customers
SET ?`; // 객체, 필드명 == 컬럼명

// 변수값 = ?
// 물음표 사용방법 따라 보내야 하는 데이터 구조 달라짐
// 1) 배열인지 구별 : 물음표 갯수(1개: 배열 아님 / 2개 이상: 배열)
//                    배열 순서: 왼쪽에서 오른쪽으로 채워짐
// 2) 객체/단일값 구별 : 물음표 앞에 컬럼있는지 확인(어느 컬럼에 들어가는 값인지 구분 가능여부)
//                       컬럼명 + ? => 단일값 / 어느 컬럼인지 구분X => 객체


// 수정1
// 뭘 수정할지 제한 안둠
let customerUpdateAll = 
`UPDATE customers
SET ?
WHERE id = ?`;  // 배열[ 객체, 단일값 ]

// 수정2
// 특정 대상 명시하는 경우
let customerUpdateInfo = 
`UPDATE customers
SET email = ?, phone = ?, address = ?
WHERE id = ?`;  // 배열[ 단일값, 단일값, 단일값, 단일값 ]

// 쿼리문 exports
module.exports = {
    customerList,
    custumerInfo,
    customerInsert,
    customerUpdateAll,
    customerUpdateInfo
}
