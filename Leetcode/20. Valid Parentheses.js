let s = "()({})([])(())";
let a = [], prev;
for (let i = 0; i < string.length; i++) {
    if (s[i] === "(" || s[i] === "{" || s[i] === "[") {
        a.push(s[i]);
        prev = s[i];
    }
    else {
        if ((prev === "(" && s[i] === ")") || (prev === "[" && s[i] === "]") || (prev === "{" && s[i] === "}")) {
            a.slice(index - 1, 1);
        }
        else {
            break;
        }
    }
}

console.log(a, a.length);