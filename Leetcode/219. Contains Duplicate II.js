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
                else {
                    map.get(nums[i]).push(i);
                }
            }
        }
    }
    return false;
};
let nums = [99, 99], k = 2;
console.log(containsNearbyDuplicate(nums, k));