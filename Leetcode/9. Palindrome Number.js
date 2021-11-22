// let x = -121;
// let y = x + "";
// y = y.split("").reverse().join("");
// console.log(y === (x + ""));

let x = 11011;
let count = 0, j = 0;
let remainder = [];
if (x < 0) {
    // return "false";
}
else {
    while (x > 0) {
        remainder[count++] = x % 10;
        x = parseInt(x / 10);
    }
    console.log(remainder);
    for (let i = 0; i < count / 2; i++) {
        if (remainder[i] === remainder[count - 1 - i]) {
            j++;
        }
    }
    if (j === count / 2) {
        console.log("true");
        // return true;
    }
    else {
        console.log("false");
        // return false;
    }
}