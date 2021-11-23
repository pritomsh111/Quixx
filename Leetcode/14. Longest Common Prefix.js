let strs = ["acc", "aaa", "aaba"];
let l1 = strs.length - 1;
if (l1 === 0) {
    return strs[0];
}
else {
    let l2, count = 0, str = '';
    for (let i = 0; i < l1; i++) {
        l2 = strs[i].length < strs[i + 1].length ? strs[i].length : strs[i + 1].length;
        // count ? l2 = count : null;
        count = 0;
        str = '';
        for (let j = 0; j < l2; j++) {
            if (strs[i][j] === strs[i + 1][j]) {
                count++;
                str += strs[i][j];
            }
            else {
                break;
            }
        }
    }

    console.log(count, str);

}