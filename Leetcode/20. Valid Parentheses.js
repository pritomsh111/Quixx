let s = "()({})([])(())";
let string = [...s];
let a = [], prev;
string.some((item, index) => {
    prev = item;
    if (item === "(" || item === "{" || item === "[") {
        a.push(item);
    }
    else {
        if ((prev === "(" && item === ")") || (prev === "[" && item === "]") || (prev === "{" && item === "}")) {
            a.slice(index - 1, 2);
        }
        else {
            return true;
        }
    }
});

console.log(a, a.length);