var frequencySort = function (s) {
    let l = s.length, map = {};

    for (let i = 0; i < l; i++) {
        map[s[i]] ? map[s[i]]++ : map[s[i]] = 1;
    }

    let sorted = Object.entries(map).sort((a, b) => b[1] - a[1]).reduce((str, item) => str + item[0].repeat(item[1]), "");
    return sorted;

    // let a = { a: 2 };
    // let mapss = new Map(Object.entries(a));
    // console.log(mapss, Object.fromEntries(mapss));
};

let s = "Aabb";
console.log(frequencySort(s));