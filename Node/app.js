let req = require("./module");

const call = (one, two) => {
    console.log({ one, two });
}

const back = (fn) => {
    fn(1, 2);
}

back(call);

console.log(req);