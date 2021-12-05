var thirdMax = function (nums) {
    let set = new Set(), length = nums.length;
    let arr = [], min = 2147483647, max = -2147483648;

    for (let i = 0; i < length; i++) {
        if (!set.has(nums[i])) {
            if (nums[i] > max) {
                arr.unshift(nums[i]);
                max = nums[i];
            }
            else {
                if (nums[i] < arr[arr.length - 1]) {
                    arr.push(nums[i]);
                }
                else {
                    if (nums[i] > arr[1]) {
                        arr.splice(i, 0, nums[i]);
                    }
                    else {
                        arr.splice(i + 1, 0, nums[i]);
                    }
                }
            }
            set.add(nums[i]);
        }
    }
    return arr[0] ? arr[2] : arr[0];
};

let nums = [1, 2, 2, 5, 3, 5];
console.log(thirdMax(nums));