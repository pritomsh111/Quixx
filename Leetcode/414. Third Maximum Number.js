var thirdMax = function (nums) {
    let set = new Set(nums);
    let arr = [-2147483648];
    for (let i of set.values()) {
        if (i >= arr[0]) {
            arr.unshift(i);
        }
        else if (i >= arr[1]) {
            arr.splice(1, 0, i);
        }
        else if (i >= arr[2]) {
            arr.splice(2, 0, i);
        }
    }
    return arr.length > 3 ? arr[2] : arr[0];
};

let nums = [1, 2, -2147483648];
console.log(thirdMax(nums));