var targetIndices = function (nums, target) {
    let res = [], i = 0;
    nums.sort((a, b) => a - b);
    i = nums.indexOf(target, i);
    while (i !== -1) {
        res.push(i);
        i = nums.indexOf(target, i + 1);
    }
    return res;
};
let nums = [1, 2, 5, 2, 3], target = 2;
console.log(targetIndices(nums, target));