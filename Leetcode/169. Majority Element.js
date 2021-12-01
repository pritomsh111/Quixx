var majorityElement = function (nums) {
    let map = new Map();
    let length = nums.length;
    for (let i = 0; i < length; i++) {
        map[nums[i]] ? map[nums[i]]++ : map[nums[i]] = 1;
        if (map[nums[i]] > length / 2) {
            return nums[i];
        }
    }
};

let nums = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(nums));