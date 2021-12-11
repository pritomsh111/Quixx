var countWords = function (words1, words2) {
    let map1 = {}, map2 = {}, count = 0;
    let l1 = words1.length, l2 = words2.length;
    for (let i = 0; i < l1; i++) {
        map1[words1[i]] ? map1[words1[i]]++ : map1[words1[i]] = 1;
    }
    for (let i = 0; i < l2; i++) {
        map2[words2[i]] ? map2[words2[i]]++ : map2[words2[i]] = 1;
    }
    for (let i = 0; i < l1 && i < l2; i++) {
        if (map1[words1[i]] === 1 && map2[words1[i]] === 1) {
            count++;
        }
    }

    // let mmm = new Map();

    // mmm.set(1, 1);
    // mmm.set(2, 1);
    // mmm.set(3, 1);

    // let mm = mmm.entries();
    // console.log(mm.next())

    return count;
};

let words1 = ["leetcode", "is", "amazing", "as", "is"], words2 = ["amazing", "leetcode", "is"];

countWords(words1, words2);