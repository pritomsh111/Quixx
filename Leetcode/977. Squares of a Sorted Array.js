var sortedSquares = function (nums) {
    let res = [], pos = null, neg = null;
    let pC = null, nC = null;
    nums.some((item, i) => {
        if (item >= 0) {
            pos = i;
            return true;
        }
        neg = i;
    });
    while (true) {
        if (nums[neg]) {
            nC = nums[neg] * nums[neg];
        }
        if (nums[pos]) {
            pC = nums[pos] * nums[pos];
        }

        if ((pC > nC && pC && nC) || (pC === null && nC !== null)) {
            res.push(nC);
            neg--;
        }
        else if ((pC < nC && pC && nC) || (pC !== null && nC === null)) {
            res.push(pC);
            pos++;
        }

        if (pos > nums.length && neg < 0) {
            break;
        }
    }

    return res;
};

let nums = [-4, -1, 0, 3, 10];
sortedSquares(nums);