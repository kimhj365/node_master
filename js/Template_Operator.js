// 1. Template literals
console.log('Template literals');

let subject = 'Javascript';
let tool = 'VS Code';

// 현재 수업은, "Javascript"를 진행하고
// 사용하는 툴은 "VS Code"입니다.
let msg = '현재 수업은, "' + subject +'"를 진행하고';
//console.log(msg);
msg = '사용하는 툴은 "' + tool +'" 입니다';
//console.log(msg);

// 템플릿 리터럴 사용시 권장 형식
msg = 
`현재 수업은, "${subject}"를 진행하고 
사용하는 툴은 "${tool}" 입니다`;
console.log(msg);


// 2. Spread Operator
console.log('Spread Operator');

// 배열
let arr1 = [4, 5, 6];
let arr2 = [1, 2, 3];
let arr3 = [arr1, arr2];
console.log(arr3);

arr3 = [...arr1, ...arr2];
console.log(arr3);

// 문자열
let word = "Hello";
// H e l l o
let alphabet = [...word, 'J', 'S'];
console.log(alphabet);

//isArray() : 배열인지 체크(T/F)
//console.log(Array.isArray(arr3));

// for(in) : 객체 내부값 순환
let user = {
            id: 100,
            name: 'Hong',
            age : 20,
            address: 'Daegu'
        };

let info = [];
for(let field in user){
    // user.field 사용불가
    console.log(field, user[field]); // [] 통해 내부값 접근
    // 객체 -> 배열 변환
    info.push(field);
};
console.log(info);
