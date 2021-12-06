var thirdMax = function (nums) {
    let set = new Set(nums);
    let arr = [], max = -2147483647, mid = -2147483647, min = -2147483647;
    for (let i of set.values()) {
        if (i > max) {
            max = i;
            arr.unshift(i);
        }
        else if (i > arr[1]) {
            arr.splice(1, 0, i);
        }
        else if (i > arr[2]) {
            arr.splice(2, 0, i);
        }
    }
    return arr[2] ? arr[2] : arr[0];
};

let nums = [3, 3, 4, 3, 4, 3, 0, 3, 3];
console.log(thirdMax(nums));