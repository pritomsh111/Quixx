var findDisappearedNumbers = function (nums) {
    let l = nums.length, r = [];
    for (let i = 1; i <= l; i++) {
        r[nums[i]] = true;
    }
    for (let i = 1; i <= l; i++) {
        if (!r[nums[i]]) {
            r.push(i);
        }
    }
    return r;
};

let nums = [4, 3, 2, 7, 8, 2, 3, 1];
findDisappearedNumbers(nums);