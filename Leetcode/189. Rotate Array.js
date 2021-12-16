var rotate = function (nums, k) {
    let temp = null;
    let l = nums.length;
    for (let i = 0; i < k % l; i++) {
        temp = nums.pop();
        nums.unshift(temp);
    }
    return nums;
};

let nums = [1, 2, 3, 4, 5, 6, 7], k = 3;
console.log(rotate(nums, k));