var moveZeroes = function (nums) {
    let l = nums.length, j = 0;
    for (let i = 0; i < l; i++) {
        if (!nums[j]) {
            nums.splice(j, 1);
            nums.push(0);
        }
        else {
            j++;
        }
    }
};
let nums = [0, 0, 1];
moveZeroes(nums);