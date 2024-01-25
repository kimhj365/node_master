console.log('Destructuring');

// Object: 객체 구조분해할당
function getUserInfo(){
    return{
        firstName : 'John',
        lastName : 'Doe',
        age : 37,
        email : 'john@gmail.com',
        city : 'New York',
        country : 'USA',
        info : function(){
            return 'My Name is ' + this.firstName
        }
    };
};

let user = getUserInfo();
console.log(user);
console.log(user.info());

let { firstName, lastName, info } = getUserInfo();
console.log(firstName, lastName);
console.log(info());
