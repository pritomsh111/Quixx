let digits = [1, 2, 3];

for (let i = digits.length - 1, count = 0; i >= 0; i--) {
    if (digits[i] + 1 % 10 === 0) {
        count = 1;
        digits[i] = 0;
    }
    else {
        if (count === 1) {

        }
        count = 0;
    }
}