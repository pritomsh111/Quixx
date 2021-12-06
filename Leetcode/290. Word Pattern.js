/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
    let mapP = new Map();
    let mapS = new Map();
    let pLen = pattern.length;
    s = s.split(" ");
    let sLen = s.length;
    if (pLen !== sLen) {
        return false;
    }
    else {
        for (let i = 0; i < pLen; i++) {
            if (!mapP.has(pattern[i]) && !mapS.has(s[i])) {
                map.set(pattern[i], s[i]);
                mapS.set(s[i], pattern[i]);
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