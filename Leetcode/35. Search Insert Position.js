const binarySearch = (arr, searchVal, left, right) => {
    for (let i = 0; i < 2; i++) {
        if (i == 1) {
            return;
        }
        console.log("For");
    }
    console.log("OUT ");
    // if (left > right) {
    //     return left;
    // }

    // let mid = left + Math.floor((right - left) / 2);
    // if (arr[mid] === searchVal) {
    //     return mid;
    // }
    // else if (searchVal < arr[mid]) {
    //     return binarySearch(arr, searchVal, left, mid - 1);
    // }
    // else {
    //     return binarySearch(arr, searchVal, mid + 1, right);
    // }
}
let nums = [1, 3, 5, 10];
binarySearch(nums, 0, 0, nums.length - 1);