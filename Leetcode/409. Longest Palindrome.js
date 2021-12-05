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
            if (max < map[key]) {
                max = map[key];
            }
        }
    }
    return sum + max;
};

console.log(longestPalindrome("bskuyhaufhwiuaaaa"));