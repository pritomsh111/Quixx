var majorityElement = function (nums) {
    let map = new Map();
    let length = nums.length;
    for (let i = 0; i < length; i++) {
        map[nums[i]] ? 0 : map[nums[i]]++;
        if (map[nums[i]] > Math.ceil(length / 2)) {
            return nums[i];
        }
    }
};

let nums = [3, 2, 3];
console.log(majorityElement(nums));