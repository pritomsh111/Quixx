var thirdMax = function (nums) {
    let max = -2147483648, min = 2147483647, mid = null, set = new Set(), length = nums.length;

    for (let i = 0; i < length; i++) {
        if (!set.has(nums[i])) {
            if (nums[i] > max) {
                if (max > -2147483648) {
                    if (mid !== null) {
                        min = mid;
                    }
                    mid = max;
                }
                max = nums[i];
            }
            else if (nums[i] < min) {
                if (mid < nums[i]) {
                    min = mid;
                    mid = nums[i];
                }
                else {
                    min = nums[i];
                }

            }
            set.add(nums[i]);
        }
    }
    return min !== 2147483647 ? min : max;
};

let nums = [3, 2, 1];
console.log(thirdMax(nums));