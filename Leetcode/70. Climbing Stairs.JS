
let n = 1;
let steps = 0;

for (let i = 1; i <= n; i++) {
    let left = n - (i * 2);
    if (left > 0) {
        steps += left * 2;
    }
}

if (n % 2 === 0) {
    steps += 1;
}

console.log(steps);