const { createReadStream } = require('fs');

const stream = createReadStream(__dirname + '\\file.txt', { highWaterMark: 20000 });

stream.on('data', (result) => {
    console.log("HELLO!!!!");
    console.log(result);
    console.log("HELLO@@@!");
});
console.log("HELLO");
console.log("HELLO");
console.log("HELLO");
console.log("HELLO");
console.log("HELLO");