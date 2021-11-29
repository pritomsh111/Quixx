var validPalindrome = function (s) {

    let l1 = s.length - 1, j = l1, i = 0, count = 0;

    while (i < Math.ceil(l1 / 2)) {
        if (s[i] === s[j]) {
            i++;
            j--;
        }
        else if (s[i] !== s[j]) {
            if (s[i] === s[j - 1]) {
                j--;
            }
            else if (s[i + 1] === s[j]) {
                i++;
            }
            else {
                return false;
            }
        }
    }
    return true;
};

console.log(validPalindrome("ebcbbececabbacecbbcbe"));