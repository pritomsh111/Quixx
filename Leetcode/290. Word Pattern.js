var wordPattern = function (pattern, s) {
    let map = new Map();
    let str = s.split(" ");
    for (let i = 0; i < pattern.length; i++) {
        if (!map.has(pattern[i])) {
            map.set(pattern[i], str[i]);
            map.set(str[i], pattern[i]);
        }
        else if (map.get(pattern[i]) !== str[i] || map.get(str[i]) !== pattern[i]) {
            return false;
        }
    }
    return true;
};

let pattern = "wwww", s = "dog dog dog dog";
console.log(wordPattern(pattern, s));