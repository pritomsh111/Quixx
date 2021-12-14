var searchRange = function (nums, target) {
    const binary = (left, right) => {
        if (left > right) {
            return -1;
        }
        let mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) {
            return mid;
        }
        else if (nums[mid] > target) {
            return binary(left, mid - 1);
        }
        else {
            return binary(mid + 1, right);
        }
    }
    let res = binary(0, nums.length - 1);
    if (res === -1) {
        return [-1, -1];
    }
    let i = res, j = res;
    while (nums[i - 1] === nums[res] || nums[j + 1] === nums[res]) {
        if (nums[i - 1] === nums[res]) {
            i--;
        }
        if (nums[j + 1] === nums[res]) {
            j++;
        }
    }
    return [i, j];
};

let nums = [5, 7, 7, 8, 8, 10], target = 8;
console.log(searchRange(nums, target));