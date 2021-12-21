var lengthOfLongestSubstring = function (s) {
    let l = s.length, slider = 0, prev = 0;
    let map = {}, max = -2147483648;
    for (let i = 0, j = 0; i < l; i++) {
        if (!map[s[i]]) {
            map[s[i]] = 1;
            slider++;
            slider > max ? max = slider : null;
        }
        else {
            while (s[j] !== s[i]) {
                map[s[j]] = 0;
                j++;
            }
            map[s[j++]] = 1;
            slider = i - j;
        }
    }
    return max;
};

let s = "bbbbb1";
console.log(lengthOfLongestSubstring(s));