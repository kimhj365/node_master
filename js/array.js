console.log('array.js');

// sort()    : 정렬함수 - 오름차순
// reverse() : 정렬함수 - 내림차순
let fruits = ['Banana', 'Orange', 'Apple', 'Mango'];

fruits.sort();
console.log(fruits);

fruits.reverse();
console.log(fruits);

let points = [40, 100, 1, 5, 25, 10];
// 1, 5, 10, 25, 40, 100
points.sort();
console.log(points);

points.sort(function (a, b) {
    // 오름차순
    return a-b;

    // 내림차순
    // return b-a;
})

// filter : 기존 배열 => (기준 통과) => 새로운 배열
let words = ['spary', 'limit', 'eleite',  'exuberant', 'destruction', 'present']

let result = words.filter((value, idx) => {
    // return 데이터타입 boolean
    //return value.length > 6;
    return value.indexOf('a') > -1
});
console.log(result);

// but 객체가 내장된 배열 필터 : 동일한 데이터(참조 타입)
let userList = [
                {id: 100, name: 'Hong'},
                {id: 200, name: 'Kang'},
                {id: 300, name: 'Han'},
               ];
let newList = userList.filter(obj => {
    return obj.name.indexOf('g') > -1;
})
console.log(userList, newList);

newList.forEach(obj => {
    obj.age = 20;
})
console.log(userList, newList);

// map(): 기존 배열 + (기준, 조작) => 새로운 배열
userList = [
    {id: 100, name: 'Hong'},
    {id: 200, name: 'Kang'},
    {id: 300, name: 'Han'},
   ];

userList.map(function(obj){
    // return 데이터 타입 제한 없음
    return obj.id < 300 ? obj : null
});

let newArray = userList.map(function(obj){
    return obj.id < 300? obj.name : null;
})
console.log(userList, newArray);

// map : 완전히 새로운 배열 만들어서 반환
newList = userList.map((obj) => {
    return {
        id : obj.id,
        name : obj.name
    };
});

console.log(userList, newList);
console.clear();
newList.forEach(obj =>{
    obj.age = 20;
})

console.log(userList, newList);

// reduce() : 누적합계
let nums = [50, 12, 999, 56, 100];
let sumRes = nums.reduce(function(total, value){
    return total + value;
}, 0);

console.log(sumRes);