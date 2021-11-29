var isIsomorphic = function (s, t) {
    let map = new Map();

    let length = s.length, i = 0;

    while (i < length) {
        if (!map.has(s[i])) {
            map.set(s[i], t[i]);
        }
        else {
            if (map.get(s[i]) !== t[i]) {
                return false;
            }
            else {
                return true;
            }
        }
    }
};


console.log(isIsomorphic("ads", "egg"));