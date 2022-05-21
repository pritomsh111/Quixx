const http = require('http');
const { createReadStream } = require('fs');

// console.log(http.STATUS_CODES);
// console.log(http.METHODS);

const server = http.createServer();

server.on('request', (req, res) => {
    // let txt = fs.readFileSync(`${__dirname}\\file.txt`, 'utf8');
    // res.end(txt);
    let txt = createReadStream(`${__dirname}\\file.txt`, 'utf8');
    txt.on('open', () => {
        txt.pipe(res);
    });
    txt.on('error', () => {
        res.end();
    });
});

server.listen(5000);