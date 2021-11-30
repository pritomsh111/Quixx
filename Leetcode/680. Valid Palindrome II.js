var validPalindrome = function (s) {

    let l1 = s.length - 1, j = l1, i = 0, count = 0, i1, j1, k = 0;

    while (i < Math.ceil(l1 / 2)) {
        if (s[i] === s[j]) {
            i++;
            j--;
        }
        else if (s[i] !== s[j]) {
            if (count === 0) {
                count++;
                if (s[i] === s[j - 1]) {
                    i1 = i + 1;
                    j1 = j--;
                    k = 1;
                }
                else if (s[i + 1] === s[j]) {
                    i1 = i++;
                    j1 = j - 1;
                    k = 2;
                }
                else {
                    return false;
                }
            }
            else {
                if (count === 1) {
                    if (k) {
                        i = i1;
                        j = j1;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
                count++;
            }
        }
    }
    return true;
};

console.log(validPalindrome("axbcbaba"));