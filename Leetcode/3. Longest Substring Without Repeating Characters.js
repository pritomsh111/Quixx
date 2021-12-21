var lengthOfLongestSubstring = function (s) {
    let l = s.length, slider = 0;
    let map = {}, max = -2147483648;
    for (let i = 0, j = 0; i < l; i++) {
        if (!map[s[i]]) {
            map[s[i]] = i + 1;
            slider++;
            slider > max ? max = slider : null;
        }
        else {
            j = map[s[i]];
            slider = (slider - map[s[i]]) + 1;
        }
    }
    return max;
};

let s = "abcabcabcdf";
console.log(lengthOfLongestSubstring(s));