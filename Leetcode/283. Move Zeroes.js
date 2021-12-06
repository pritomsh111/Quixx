var moveZeroes = function (nums) {
    let l = nums.length, j = 0;
    for (let i = 0; i < l; i++) {
        if (!nums[i]) {
            j++;
            nums.splice(i, 1);
        }
    }
    return nums.fill(0, l - j, l - 1);
};
let nums = [0, 1, 0, 3, 12];
console.log(moveZeroes(nums));