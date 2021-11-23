let s = "()[]{}";
// let s = "(()(){)";
s = [...s];
let a = [], prev;
for (let i = 0; i < s.length; i++) {
    if (s[i] === "(" || s[i] === "{" || s[i] === "[") {
        a.push(s[i]);
        prev = s[i];
    }
    else {
        if ((prev === "(" && s[i] === ")") || (prev === "[" && s[i] === "]") || (prev === "{" && s[i] === "}")) {
            a.splice(i - 1, 1);
            s.splice(i - 1, 2);
            if (i - 2 >= 0) {
                prev = a[i - 2];
                i -= 2;
            }
        }
        else {
            break;
        }
    }
}

console.log(a, a.length);