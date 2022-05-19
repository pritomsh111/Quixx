const http = require('http');
const fs = require('fs');

// console.log(http.STATUS_CODES);
// console.log(http.METHODS);

const server = http.createServer();

server.on('request', (req, res) => {
    let txt = fs.readFileSync(`${__dirname}\\file.txt`, 'utf8');
    res.end(txt);
});

server.listen(5000);