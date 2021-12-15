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
    while (pos < l || neg > -1) {

        neg >= 0 && nums[neg] < 0 ? nC = nums[neg] * nums[neg] : nC = null;
        pos < l && nums[pos] >= 0 ? pC = nums[pos] * nums[pos] : pC = null;

        if (nC === null) {
            res.push(pC);
            pos++;
        }
        else if (pC === null) {
            res.push(nC);
            neg--;
        }
        else {
            if (pC >= nC) {
                res.push(nC);
                neg--;
            }
            else if (pC < nC) {
                res.push(pC);
                pos++;
            }
        }
    }
    return res;
};

let nums = [-7, -3, 2, 3, 11];
console.log(sortedSquares(nums));