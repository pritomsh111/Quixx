var validPalindrome = function (s) {

    let l1 = s.length - 1, j = l1, i = 0, count = 0, i1, j1;

    while (i < Math.ceil(l1 / 2)) {
        if (s[i] === s[j]) {
            i++;
            j--;
        }
        else if (s[i] !== s[j]) {
            if (count++ === 0) {
                if (s[i] === s[j - 1]) {
                    j--;
                    j1 = 1;
                }
                else if (s[i + 1] === s[j]) {
                    i++;
                    i1 = 1;
                }
                else {
                    return false;
                }
            }
            else {
                if (j1) {
                    i++;
                    j--;
                }
                else if (i1) {
                    i--;
                    j++;
                }
                else {
                    return false;
                }
                i1 = j1 = 0;
            }
        }
    }
    return true;
};

console.log(validPalindrome("abac"));