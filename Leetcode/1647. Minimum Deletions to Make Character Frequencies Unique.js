var minDeletions = function (s) {
    let l = s.length, map = {};
    for (let i = 0; i < l; i++) {
        map[s[i]] ? map[s[i]]++ : map[s[i]] = 1;
    }
    let sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
    console.log(sorted);
};

let s = "ceabaacb";
minDeletions(s);