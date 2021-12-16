var rotate = function (nums, k) {
    let temp = null;
    let l = nums.length;
    for (let i = 0; i < k; i++) {
        let n = nums.pop();
        nums = [n, ...nums];
    }
    console.log(nums);
    return nums;
};

let nums = [1, 2, 3, 4, 5, 6, 7], k = 3;
console.log(nums);
console.log(rotate(nums, k));