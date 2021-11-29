let s = "aba";

let l1 = s.length - 1, j = l1, i = 0;

while (i <= l1 / 2) {
    if (s[i] === s[j]) {
        i++;
    }
}