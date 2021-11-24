const binarySearch = (arr, searchVal, left, right) => {
    if (left === right) {
        return left;
    }

    let mid = left + (right - left) / 2;

    if (searchVal < arr[mid]) {
        return binarySearch(arr, searchVal, left, right - 1);
    }
    else {
        return binarySearch(arr, searchVal, left + 1, right);
    }
}
let nums = [1, 3, 5, 6];
console.log(binarySearch(nums, 10, 0, nums.length));