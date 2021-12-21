var lengthOfLongestSubstring = function (s) {
    let l = s.length, slider = 0, prev = 0;
    let map = {}, max = -2147483648;
    for (let i = 0, j = 0; i < l; i++) {
        if (!map[s[i]]) {
            map[s[i]] = i + 1;
            slider++;
            slider > max ? max = slider : null;
        }
        else {
            j = map[s[i]];
            map[s[i]] = 0;
            i--;
            slider = slider - (j - prev);
            prev = j;
        }
    }
    return max;
};

let s = "abcabcbb123456";
console.log(lengthOfLongestSubstring(s));