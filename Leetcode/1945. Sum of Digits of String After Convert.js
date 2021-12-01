let s = 'zabx';

let length = s.length, sum = '';

for (let i = 0; i < length; i++) {
    sum += s.charCodeAt(i) - 96 + "";
    console.log(s.charCodeAt(i) - 96);
}
console.log(sum, parseInt(sum));
