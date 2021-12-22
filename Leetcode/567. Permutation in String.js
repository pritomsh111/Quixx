var checkInclusion = function (s1, s2) {
    let s1L = s1.length;
    let s2L = s2.length;
    let map2 = {};
    let count = 0, j = 0;
    if (s2L < s1L) {
        return false;
    }
    let map = {};
    for (let i = 0; i < s1L; i++) {
        map[s1[i]] ? map[s1[i]]++ : map[s1[i]] = 1;
    }
    for (let i = 0; i < s2L; i++) {
        if (map[s2[i]]) {
            map2 = {}, count = 0, j = s1L;
            while (j-- > 0) {
                map2[s2[i]] ? map2[s2[i]]++ : map2[s2[i]] = 1;
                if (map2[s2[i]] === map[s1[i]]) {
                    count++;
                }
                else if (map2[s2[i]] > map[s1[i]]) {
                    break;
                }
            }
        }
    }
    return count === s1L;
};

let s1 = "ab", s2 = "eidbaooo";
console.log(checkInclusion(s1, s2));