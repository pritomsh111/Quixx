var commonChars = function (words) {
    let map = {}, length = words.length;

    let l = words[0].length, s = words[0];
    for (let j = 0; j < l; j++) {
        map[words[0][j]] ? map[words[0][j]]++ : map[words[0][j]] = 1;
    }

    for (let i = 1; i < length; i++) {
        l = words[i].length;
        s = '';
        for (let j = 0; j < l; j++) {
            if (map[words[i][j]] > 0) {
                map[words[i][j]]--;
                s += words[i][j];
            }
        }
    }
    return s.split("");
};

let words = ["bella", "label", "roller"];
commonChars(words);