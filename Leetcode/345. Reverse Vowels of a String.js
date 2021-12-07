var reverseVowels = function (s) {
    let i = 0, j = s.len - 1, flag1 = false, flag2 = false;
    while (i !== j) {
        if (s[i] === "a" || s[i] === "e" || s[i] === "i" || s[i] === "o" || s[i] === "u") {
            flag1 = true;
        }
        else {
            flag1 = false;
            i++;
        }

        if (s[j] === "a" || s[j] === "e" || s[j] === "i" || s[j] === "o" || s[j] === "u") {
            flag2 = true;
        }
        else {
            flag2 = false;
            j++;
        }

        if (flag1 && flag2) {
            let temp = s[i];
            s[i] = s[j];
            s[j] = temp;
            i++; j++;
            flag1 = flag2 = false;
        }
    }
    return s;
};

let s = "hello";
reverseVowels(s);