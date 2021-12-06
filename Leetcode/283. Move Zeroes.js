var moveZeroes = function (nums) {
    let l = nums.length, flag = false;
    for (let i = 0, j = 0; j < l; j++) {
        if (flag && nums[j]) {
            nums[i++] = nums[j];
            nums[j] = 0;
            flag = false;
        }
        else {
            flag = true;
            i++;
        }
    }
    console.log(nums);
};
let nums = [1, 0, 0, 1];
moveZeroes(nums);