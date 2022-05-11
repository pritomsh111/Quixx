let path = require('path');

console.log(path.sep);
console.log(path.delimiter);

let joiner = path.join(__dirname);
console.log(path.basename(__dirname));
console.log(joiner);

let absolu = path.resolve(__dirname);
console.log(typeof absolu, typeof joiner);