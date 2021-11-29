var isIsomorphic = function (s, t) {
    let map = new Map();
    let set = new Set();

    let length = s.length, i = 0;

    while (i < length) {
        if (!map.has(s[i])) {
            if (!set.has(t[i])) {
                map.set(s[i], t[i]);
                set.add(t[i]);
            }
            else {
                return false;
            }
        }
        else {
            if (map.get(s[i]) !== t[i]) {
                return false;
            }
        }
        i++;
    }
    return true;
};


console.log(isIsomorphic("add", "egg"));