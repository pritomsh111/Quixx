let x = -121;
let y = x + "";
y = y.split("").reverse().join("");
console.log(y === (x + ""));