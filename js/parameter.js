function getComment(user = 'Anony', msg = 'no comment'){
    let result = `${msg}, from ${user}`;
    console.log(result);
}

getComment('Han', 'Today is ...');
getComment('Edward');
getComment(undefined, 'Hello, World!');
getComment();

// Rest Parameter
function sum(x= 0, y = 0, ...args){
    let result = x + y;
    for(let num of args){
        result += num;
    }
    return result;
}


console.log(sum(1, 2));
console.log(sum(10, 20, 30, 40));

let ary = [1, 2, 3, 4, 5, 6, 7];
console.log(sum(...ary));