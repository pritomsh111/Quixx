var containsNearbyDuplicate = function (nums, k) {
    let map = new Map();
    let length = nums.length;

    for (let i = 0; i < length; i++) {
        if (!map.has(nums[i])) {
            map.set(nums[i], [i]);
        }
        else {
            for (let j = 0; j < map.get(nums[i]).length; j++) {
                if (Math.abs(i - map.get(nums[i])[j]) <= k) {
                    return true;
                }
            }
            map.get(nums[i]).push(i);
        }
    }
    return false;
};
let nums = [1, 0, 1, 1], k = 1;
console.log(containsNearbyDuplicate(nums, k));