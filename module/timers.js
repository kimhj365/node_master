// Date 함수
function format(value){
    return ('0' + value).slice(-2); // 한자리수 숫자 앞에 0 붙이기
}

// 현재 날짜, 시간 생성 함수
function getDateTime(){
    let today = new Date();
    let year = today.getFullYear();
    let month = format(today.getMonth() + 1);
    let date = format(today.getDate());

    let hour = format(today.getHours());
    let min = format(today.getMinutes());
    let sec = format(today.getSeconds());

    return `${year}-${month}-${date} ${hour}:${min}:${sec}`;
}
console.log(getDateTime());

// Timers 모듈 함수: 전역함수
// require('timers') 없이 사용가능

// setTimeout(): 설정한 시간(밀리초) 이후 콜백함수 실행
//               but 다른 실행 코드 때문에 늦어질 수 있음  
const timeout = setTimeout(()=>{
    console.log(getDateTime());
}, 3000);

clearTimeout(timeout);

// setInterval() : 설정한 시간마다 콜백함수 실행
let count = 0;
const interval = setInterval(()=>{
    console.log('count', count++);
    if(count == 5 ){
        // clearInterval() : setInterval 취소
        clearInterval(interval);
    }
    console.log(getDateTime());
}, 2000);

// setImmediate(): 뒤의 코드 먼저 모두 실행된 다음에 실행됨
setImmediate(()=>{
    console.log('setImmegiate', getDateTime());
});

console.log('마지막 코드');
