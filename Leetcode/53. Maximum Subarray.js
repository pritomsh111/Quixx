let nums = [-13, -2];
let sum = 0, max = -10000;
nums.map(item => {
    sum += item;
    if (sum >= 0) {
        if (sum > max) {
            max = sum;
        }
    }
    else if (sum < 0) {
        sum = 0;
        if (item > max) {
            max = item;
        }
    }
});

console.log(max);