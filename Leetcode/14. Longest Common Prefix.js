let strs = ["cir", "car"];
let l1 = strs.length - 1;
let l2, count = 0, str = '';
for (let i = 0; i < l1; i++) {
    count = 0;
    str = '';
    l2 = strs[i].length < strs[i + 1].length ? strs[i].length : strs[i + 1].length;
    for (let j = 0; j < l2; j++) {
        if (strs[i][j] === strs[i + 1][j]) {
            count++;
            strs = strs[i][j];
        }
        else {
            break;
        }
    }
}

console.log(count, str);