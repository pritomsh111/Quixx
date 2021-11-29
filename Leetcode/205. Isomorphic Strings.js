var isIsomorphic = function (s, t) {
    for (let index = 0; index < s.length; ++index) {
        console.log(s.indexOf(s[index]), t.indexOf(t[index]))
        if (s.indexOf(s[index]) != t.indexOf(t[index])) {
            return false;
        }
    }
    return true;
    // let map = new Map();
    // let set = new Set();

    // let length = s.length, i = 0;

    // while (i < length) {
    //     if (!map.has(s[i])) {
    //         if (!set.has(t[i])) {
    //             map.set(s[i], t[i]);
    //             set.add(t[i]);
    //         }
    //         else {
    //             return false;
    //         }
    //     }
    //     else {
    //         if (map.get(s[i]) !== t[i]) {
    //             return false;
    //         }
    //     }
    //     i++;
    // }
    // return true;
};


console.log(isIsomorphic("add", "egg"));