var removeDuplicates = function (nums) {
    let count = 0;

    for (let i = 0; i < nums.length - 1; i++) {
        if ((nums[i] === nums[i + 1]) && nums[i] !== "-") {
            nums.splice(nums[i + 1], 1);
            nums.push("-");
            i--;
            count++;
        }
    }

    return count;
};

console.log(removeDuplicates([1, 1, 2]));