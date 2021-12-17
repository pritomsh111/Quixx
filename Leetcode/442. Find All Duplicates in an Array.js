var findDuplicates = function (nums) {
    let l = nums.length, res = [];

    for (let i = 0; i < l; i++) {
        let t = Math.abs(nums[i]) - 1;
        if (nums[t] < 0) {
            res.push(Math.abs(nums[i]));
        }
        else {
            nums[t] = -nums[t];
        }
    }

    return res;
};

let nums = [4, 3, 2, 7, 8, 2, 3, 1];
console.log(findDuplicates(nums));