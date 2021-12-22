var maximumUniqueSubarray = function (nums) {
    let l = nums.length, max = 0, sum = 0;
    let map = {};
    for (let i = 0, j = 0; i < l; i++) {
        if (!map[nums[i]]) {
            map[nums[i]] = 1;
            sum += nums[i];
            max = Math.max(max, sum);
        }
        else {
            while (nums[j] !== nums[i]) {
                map[nums[j]] = 0;
                sum -= nums[j++];
            }
            sum -= nums[j++];
            sum += nums[i];
        }
    }
    return sum;
};

let nums = [10000, 1, 10000, 1, 1, 1, 1, 1, 1];
console.log(maximumUniqueSubarray(nums));