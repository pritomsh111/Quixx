var findDuplicates = function (nums) {
    let l = nums.length, res = [];

    for (let i = 0; i < l; i++) {
        if (Math.abs(nums[nums[i] - 1]) === -nums[i]) {
            res.push(nums[i]);
        }
        else {
            nums[Math.abs(nums[i]) - 1] = -nums[i];
        }
    }

    return res;
};

let nums = [4, 3, 2, 7, 8, 2, 3, 1];
console.log(findDuplicates(nums));