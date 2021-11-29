let n = 2;
var isHappy = function (n) {
    let sum, dup = n;
    let set = new Set();
    while (dup !== 1) {
        sum = 0;
        while (dup > 0) {
            sum += (dup % 10) ** 2;
            dup = Math.floor(dup / 10);
        }
        if (!set.has(sum)) {
            set.add(sum);
            dup = sum;
        }
        else {
            return false;
        }
    }
    return true;
};
console.log(isHappy(n));
