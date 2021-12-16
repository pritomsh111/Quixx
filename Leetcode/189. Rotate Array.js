var rotate = function (nums, k) {
    const reverse = (start, end) => {
        while (end > start) {
            let temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            end--;
            start++;
        }
    }
    let l = nums.length;
    k = k % l;
    reverse(0, l - 1);
    reverse(0, k - 1);
    reverse(k, l - 1);
    return nums;
};
let nums = [1, 2, 3, 4, 5, 6, 7], k = 3;
console.log(rotate(nums, k));