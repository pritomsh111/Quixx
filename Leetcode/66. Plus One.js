let digits = [9, 9, 9];

let length = digits.length - 1;

let lastDigit = digits[length] + 1;

if (lastDigit % 10 !== 0) {
    digits[length] = lastDigit;
}
else {
    for (i = length; i >= 0; i--) {
        if (digits[i] === 9) {
            digits[i] = 0;
            if (i === 0) {
                digits.unshift(1);
            }
        }
        else {
            digits[i] += 1;
            break;
        }
    }
}

console.log(digits);