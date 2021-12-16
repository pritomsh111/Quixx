var moveZeroes = function (nums) {
    // let l = nums.length, j = 0;
    // for (let i = 0; i < l; i++) {
    //     if (!nums[j]) {
    //         nums.splice(j, 1);
    //         nums.push(0);
    //     }
    //     else {
    //         j++;
    //     }
    // }
    let l = nums.length;
    let zero = 0, i = 0;
    while (i < l) {
        if (nums[i]) {
            nums[zero++] = nums[i];
        }
        i++;
    }
    while (zero < l) {
        nums[zero++] = 0;
    }
    return nums;
};
let nums = [0, 1, 0, 3, 12];
console.log(moveZeroes(nums));