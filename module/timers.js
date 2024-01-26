function format(value){
    return ('0' + value).slice(-2);
}

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

const timeout = setTimeout(()=>{
    console.log(getDateTime());
}, 3000);

clearTimeout(timeout);

let count = 0;
const interval = setInterval(()=>{
    console.log('count', count++);
    if(count == 5 ){
        clearInterval(interval);
    }
    console.log(getDateTime());
}, 2000);

setImmediate(()=>{
    console.log('setImmegiate', getDateTime());
});

console.log('마지막 코드');
