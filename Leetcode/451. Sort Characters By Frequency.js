var frequencySort = function (s) {
    let l = s.length, map = {};

    for (let i = 0; i < l; i++) {
        map[s[i]] ? map[s[i]]++ : map[s[i]] = 1;
    }

    let sorted = Object.entries(map).sort((a, b) => b[1] - a[1]).reduce((str, item) => {
        let ss = '';
        for (let i = 0; i < item[1]; i++) {
            ss += item[0];
        }
        return str + ss;
    }, "");
    return sorted;
};

let s = "Aabb";
console.log(frequencySort(s));