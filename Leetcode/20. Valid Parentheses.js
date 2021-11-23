// let s = "]";
let s = "(()(){)";
s = [...s];
let prev;
for (let i = 0; i < s.length; i++) {
    if (s[i] === "(" || s[i] === "{" || s[i] === "[") {
        prev = s[i];
    }
    else {
        if ((prev === "(" && s[i] === ")") || (prev === "[" && s[i] === "]") || (prev === "{" && s[i] === "}")) {
            s.splice(i - 1, 2);
            i - 2 >= 0 ? n = 2 : n = 1;
            prev = s[i - n];
            i -= n;
        }
        else {
            break;
        }
    }
}

console.log(s, s.length);