console.log('arrow.js');

// < 함수 선언 방법 >
// 1. 함수 선언식 : var 선언자로 변수 선언한 것과 동일
//                  전역변수, 동일 이름 함수 생성 가능, 함수 선언 전에 호출 가능(호이스팅)
hello('JS')
function hello(name){
    console.log(name);
}

function hello(msg){
    console.log('출력' + msg);
}

// 2. 함수 표현식 : const 선언자와 동일
//                  항상 함수 호출 전에 선언되어야 함
const hello2 = function(name){
    console.log('hello' + name);
}

// 화살표 함수 : 표현식으로만 사용 가능 
//               (why? 이름 없어서 이름으로 선언 불가 / 익명함수로만 사용) 
const hello3 = (name) => console.log('hello, ' + name);
hello3('Javascript');

// 화살표 함수 문법
let msg = msg => console.log('result, ' + msg); // 매개변수 1개(괄호 생략가능)
msg = () => console.log('Hello, World!');       // 매개변수 없음
msg = (x, y) => console.log(x+y);               // 매개변수 여러개

// 구현부 2줄 이상 : 중괄호
msg = (x,y) => {
    let result = x + y;
    console.log(result);
}

console.clear();

// 화살표 함수와 this의 연관성
//  : 화살표 함수에 this 같이 사용 X
//    eventListener의 콜백 함수로 화살표 함수 등록 X
let array = [1, 3, 5, 7];

array.forEach(function(value, idx) {
    console.log(value, this);
});

array.forEach((value, idx) => {
    console.log(value, this);
});