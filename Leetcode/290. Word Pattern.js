var wordPattern = function (pattern, s) {
    let mapP = new Map();
    let mapS = new Map();
    s = s.split(" ");
    let pLen = pattern.length;
    let sLen = s.length;
    if (pLen !== sLen) {
        return false;
    }
    else {
        for (let i = 0; i < pLen; i++) {
            if (!mapP.has(pattern[i]) && !mapS.has(s[i])) {
                mapP.set(pattern[i], s[i]);
                mapS.set(s[i], pattern[i]);
            }
            else if (mapP.get(pattern[i]) !== s[i]) {
                return false;
            }
        }
    }
    return true;
};

let pattern = "aaaa", s = "dog dog dog dog";
console.log(wordPattern(pattern, s));