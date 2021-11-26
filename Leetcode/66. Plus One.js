let digits = [1, 2, 3];

for (let i = digits.length - 1, count = 0; i >= 0; i--) {
    if (digits[i] === 9) {
        count = 1;
    }
    else {
        if (count === 1) {

        }
        count = 0;
    }
}