// let x = -121;
// let y = x + "";
// y = y.split("").reverse().join("");
// console.log(y === (x + ""));

// let x = 110;
// let count = 0, j = 0;
// let remainder = [];
// if (x < 0) {
//     // return "false";
// }
// else {
//     while (x > 0) {
//         remainder[count++] = x % 10;
//         x = parseInt(x / 10);
//     }
//     console.log(remainder);
//     for (let i = 0; i < Math.floor(count / 2); i++) {
//         if (remainder[i] === remainder[count - 1 - i]) {
//             j++;
//         }
//     }
//     if (j === Math.floor(count / 2)) {
//         console.log("true");
//         // return true;
//     }
//     else {
//         console.log("false");
//         // return false;
//     }
// }

let x = 123211;
let copy = x;
let reverse = 0;
if (x < 0) {
    // return false;
}
else {
    while (copy > 0) {
        reverse = (reverse * 10) + (copy % 10);
        copy = Math.floor(copy / 10);
    }
    console.log(reverse === x);
}