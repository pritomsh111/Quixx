var longestPalindrome = function (s) {
    let l = s.length, onFlag = 0, sum = 0;
    let map = new Map();
    for (let i = 0; i < l; i++) {
        map[s[i]] ? map[s[i]]++ : (map[s[i]] = 0, map.set(s[i]));
    }
    for (let key of map.keys()) {
        if (map[key] % 2 === 0) {
            sum += map[key];
        }
        else {
            if (!onFlag) {
                sum += map[key];
            }
            else {
                sum += (map[key] - 1);
            }
        }
    }
    return sum;
};

console.log(longestPalindrome("abccccdd"));