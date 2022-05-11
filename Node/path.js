let path = require('path');

console.log(path.sep);
console.log(path.delimiter);

let joiner = path.join(__dirname);
console.log(path.basename(__dirname));