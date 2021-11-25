let nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
let sum = 0;
nums.map(item => {
    if (sum + item >= 0) {
        sum += item;
    }
    else {
        sum = 0;
    }
});

console.log(sum);