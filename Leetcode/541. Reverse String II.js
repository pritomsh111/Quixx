var reverseStr = function (s, k) {
    let t;
    let l = s.length;
    s = s.split("");

    const reverse = (start, end) => {
        while (end > start) {
            t = s[start];
            s[start++] = s[end];
            s[end--] = t;
        }
    }
    if (k > l) {
        reverse(0, l - 1);
    }
    else {
        for (let i = 0; i < l;) {
            if ((l - i) < k) {
                reverse(i, l - 1);
                i = l;
            }
            else {
                reverse(i, i + k - 1);
                i += 2 * k;
            }
        }
    }
    return s.join("");
};

let s = "abcdefg", k = 2;
console.log(reverseStr(s, k));