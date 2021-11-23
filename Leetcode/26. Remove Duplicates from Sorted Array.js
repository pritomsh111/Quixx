var removeDuplicates = function (nums) {
    let count = 0;

    for (let i = 0; i < nums.length; i++) {
        if ((nums[i] === nums[i + 1])) {
            continue;
        }
        nums[count++] = nums[i];
    }
    return count;
};

console.log(removeDuplicates([-1, 0, 0, 0, 0, 3, 3]));