// 1. 전체 모듈 다 받아오기(이름 선택권X)
// const cal = require('./calculator.js');
// console.log(cal.defNum, cal.add(1,2));
import cal from './calculator.js';
console.log(cal.defNum, cal.add(1,2));

// 2. 모듈 일부만 받아오기(이름 선택가능)
const {defNum, add} = require('./calculator.js');
console.log(defNum, add(1,2));
