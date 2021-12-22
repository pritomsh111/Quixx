var checkInclusion = function (s1, s2) {
    let s1L = s1.length;
    let s2L = s2.length;
    if (s2L < s1L) {
        return false;
    }
    let map = {}, map2 = {};

    const check = () => {
        for (let [key, val] of Object.entries(map)) {
            if (map2[key] !== val) {
                return false;
            }
        }
        return true;
    }
    for (let i = 0; i < s1L; i++) {
        map[s1[i]] ? map[s1[i]]++ : map[s1[i]] = 1;
    }
    for (let i = 0, j = 0; i <= s2L; i++) {
        if (i < s1L) {
            map2[s2[i]] ? map2[s2[i]]++ : map2[s2[i]] = 1;
        }
        else {
            if (check()) {
                return true;
            }
            else {
                map2[s2[i]] ? map2[s2[i]]++ : map2[s2[i]] = 1;
                map2[s2[j++]]--;
            }
        }
    }
    return false;
};

let s1 = "", s2 = "dceda";
console.log(checkInclusion(s1, s2));