// userSql.js

// 조회(전체)
let userList = 
`SELECT user_no
        , user_id
        , user_pwd
        , user_name
        , user_gender
        , user_age
        , join_date
FROM t_users`;

// 조회(단건)
let userInfo = 
`SELECT user_no
        , user_id
        , user_pwd
        , user_name
        , user_gender
        , user_age
        , join_date
FROM t_users
WHERE user_id = ?`;

// 등록
let userInsert = 
`INSERT INTO t_users
SET ?`; // 객체, 필드명 == 컬럼명(user_no 제외)

// 수정1
// 뭘 수정할지 제한 안둠
let userUpdateAll = 
`UPDATE t_users
SET ?
WHERE user_id = ?`;  // 배열[ 객체, 단일값 ]

// 수정2
// 특정 대상 명시하는 경우
let userUpdateInfo = 
`UPDATE t_users
SET user_pwd = ?, user_name = ?, user_gender = ?, user_age = ?, join_date = ?
WHERE user_id = ?`;  // 배열[ 단일값, 단일값, 단일값, 단일값 ]

// 삭제
let userDelete = 
`DELETE FROM t_users
WHERE user_id = ?;`

module.exports = {
    userList, 
    userInfo,
    userInsert,
    userUpdateAll,
    userUpdateInfo,
    userDelete
}