var longestPalindrome = function (s) {
    let map = new Map();
    let l = s.length;
    for (let i = 0; i < l; i++) {
        map[s[i]] ? (map[s[i]]++, map.set(s[i])) : 0;
    }

};

longestPalindrome("abccccdd");