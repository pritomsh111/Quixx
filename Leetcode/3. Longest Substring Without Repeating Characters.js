var lengthOfLongestSubstring = function (s) {
    let l = s.length, slider = 0;
    let map = {}, max = 0;
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
            map[s[i]] = 1;
            j++;
            slider = i - j + 1;
        }
    }
    return max;
};

let s = "pwwkeyw";
console.log(lengthOfLongestSubstring(s));