const fs = require('fs');
const data = 'Hello, Node.js World!';

// fs.writeFile('./sample.txt', data, 'utf-8', (err) => {
//     if(err) throw err;
//     console.log('job complete');
// });

fs.readFile('./sample.txt', 'utf-8', (err, data) => {
    if(err) throw err;
    console.log(data);
})