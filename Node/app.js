console.log(require("./module"));
let req = require("./module");

const call = (one, two) => {
    // console.log({ one, two });
}

const back = (fn) => {
    fn(1, 2);
}

back(call);
let arr = [1, 2, 3];

arr.copyWithin(2, 0);

// console.log(arr);
// console.log(arr.values().next().value);
// console.log(req);

// console.log(typeof __dirname, typeof __filename);
// console.log(process);