var findDisappearedNumbers = function (nums) {
    let l = nums.length, r = [], rr = [];
    for (let i = 0; i < l; i++) {
        r[nums[i]] = true;
    }
    for (let i = 1; i <= l; i++) {
        if (!r[i]) {
            rr.push(i);
        }
    }
    return rr;
};

let nums = [4, 3, 2, 2, 3, 1];
console.log(findDisappearedNumbers(nums));