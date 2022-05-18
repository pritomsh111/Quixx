const { createReadStream } = require('fs');
const path = require('path');

const stream = createReadStream(__dirname + '\\file.txt');

stream.on('data', (result) => {
    console.log(result);
});