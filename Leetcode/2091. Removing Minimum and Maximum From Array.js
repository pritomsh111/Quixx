var minimumDeletions = function (nums) {
    let l = nums.length, max = -2147483648, min = 2147483647;
    let mx = null, mn = null, t = null;
    for (let i = 0; i < l; i++) {
        if (nums[i] > max) {
            mx = i;
            max = nums[i];
        }

        if (min > nums[i]) {
            mn = i;
            min = nums[i];
        }
    }
    mn > mx ? (t = mx, mx = mn, mn = t) : null;
    let minn = Math.min(((mx - mn) + mn + 1), ((mx - mn) + (l - mx)), (mn + 1 + (l - mx)));

    return minn;
};

let nums = [-87, 60, -30, -67, 74, 55, 76, -53];
console.log(minimumDeletions(nums));