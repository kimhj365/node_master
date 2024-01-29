const defaultNum = 1;

function add(num1, num2){
    return num1 + num2;
}

function minus(num1, num2){
    return num1 - num2;
}

function multi(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

// 모듈 exports
// 반드시 코드 마지막에 위치해야 함
// 밖으로 내보내려는 대상 정의(모든 대상X, 필요한 것만)
// module.exports = {
export default {
    // 기존 변수 이름과 다른 이름으로 export
    defNum : defaultNum,
    // 변수/함수와 동일한 이름의 필드 생성하는 표현
    add,    // add : add
    minus,  // "minus" : minus
    multi,
    divide
}
