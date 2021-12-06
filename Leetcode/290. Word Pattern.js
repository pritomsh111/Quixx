/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
    let map = new Map();
    let pLen = pattern.length;
    s = s.split(" ");
    let sLen = s.length;
    if (pLen !== sLen) {
        return false;
    }
    else {
        for (let i = 0; i < pLen; i++) {
            if (!map.has(pattern[i])) {
                map.set(pattern[i], s[i]);
            }
            else if (s[i] !== map.get(pattern[i])) {
                return false;
            }
        }
    }
    return true;
};

let pattern = "abba", s = "dog cat cat fish";
console.log(wordPattern(pattern, s));