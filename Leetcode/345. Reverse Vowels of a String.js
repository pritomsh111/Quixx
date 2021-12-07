var reverseVowels = function (s) {
    let i = 0, j = s.length - 1, flag1 = false, flag2 = false;
    let split = s.split("");
    s = s.toLowerCase();
    while (i < j) {
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
            j--;
        }

        if (flag1 && flag2) {
            let temp = split[i];
            split[i] = split[j];
            split[j] = temp;
            i++; j--;
            flag1 = flag2 = false;
        }
    }
    return split.join("");;
};

let s = "aekkkkikkjikkkou";
console.log(reverseVowels(s));