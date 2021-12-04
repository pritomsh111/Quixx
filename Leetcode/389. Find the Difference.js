var findTheDifference = function (s, t) {
    let l = t.length;
    for (let i = 0; i < l; i++) {
        if (t.indexOf(s[i]) >= 0) {
            t = t.replace(s[i], "");
        }
    }
    return t;
};
let s = "abcd", t = "abcde";
findTheDifference(s, t);