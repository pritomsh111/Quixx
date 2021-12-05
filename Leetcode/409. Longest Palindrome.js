var longestPalindrome = function (s) {
    let map = new Map(), l = s.length, sum = 0, max = 0;
    for (let i = 0; i < l; i++) {
        map[s[i]] ? map[s[i]]++ : (map[s[i]] = 1, map.set(s[i]));
    }
    for (let key of map.keys()) {
        if (map[key] % 2 === 0) {
            sum += map[key];
        }
        else {
            sum += map[key] - 1;
            if (map[key] === 1) {
                max = 1;
            }
        }
    }
    return sum + max;
};

console.log(longestPalindrome("abccccdd"));