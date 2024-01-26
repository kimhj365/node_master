// 1. ES6 이전 객체 정의
// 재생산을 위한 객체 => 생성자함수 + 즉시실행함수

// 익명함수 안에 생성자 함수 + getter, setter
// 변수에 객체 정보 넘겨줌
// var Person = (function() {
//     // 생성자 함수(대문자)
//     function Person(name){
//         // 객체가 가질 필드
//         this._name = name; // 언더바(_) : (암묵적으로)직접 접근을 제한
//     }

//     // 객체가 가질 메소드
//     // 프로토 타입
//     Person.prototype.sayHi = function () {
//         console.log('Hi ' + this._name);
//     }

//     // 필드에 접근할 Setter, Getter
//     Person.prototype.setName = function (name) {
//         this._name = name;
//     }

//     Person.prototype.getName = function () {
//         return this._name;
//     }
//     // 함수 정보 리턴
//     return Person;
// })(); // 즉시실행함수 : 함수 정의하자마자 실행

// // new와 결합 => 객체 생성 함수
// let userA = new Person('Hong');
// userA.sayHi();
// userA.setName('Edward');
// userA.sayHi();

// 2. ES6 이후 객체 정의 = let, const
// 클래스 도입
class Person{
    // 필드
    constructor(name){
        this._name = name;
    }

    // 메소드
    sayHi(){
        console.log('Hi, new ' + this._name);
    }

    // Setter, Getter
    // set name(name){
    //     this._name = name;
    // }

    get name(){
        return this._name;
    }
}

let userB = new Person('Hong');
userB.sayHi();
userB.name = 'Lee';
console.log(userB.name);
userB.sayHi();