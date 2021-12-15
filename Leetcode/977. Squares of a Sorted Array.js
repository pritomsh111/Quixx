var sortedSquares = function (nums) {
    let l = nums.length;
    let res = [], pos = l, neg = -1;
    let pC = null, nC = null;
    nums.some((item, i) => {
        if (item >= 0) {
            pos = i;
            return true;
        }
        neg = i;
    });
    while (true) {
        console.log({ pos, neg });

        nums[neg] < 0 ? nC = nums[neg] * nums[neg] : nC = null;
        nums[pos] >= 0 ? pC = nums[pos] * nums[pos] : pC = null;

        if ((pC > nC) || (pC === null && nC !== null)) {
            res.push(nC);
            neg--;
        }
        else if ((pC < nC) || (pC !== null && nC === null)) {
            res.push(pC);
            pos++;
        }

        if (pos === l && neg === -1) {
            break;
        }
    }
    return res;
};

let nums = [-4, -1, 0, 3, 10];
console.log(sortedSquares(nums));