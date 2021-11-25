let nums = [5, 4, -1, 7, 8];
let sum = 0, max = -10000;
nums.map(item => {
    if (sum + item >= 0) {
        sum += item;
        if (sum > max) {
            max = sum;
        }
    }
    else {
        sum = 0;
    }
});

console.log(max);