var twoSum = function (numbers, target) {
    let length = numbers.length;
    let sum = 0;
    for (let i = 0, start = 0, end = length - 1; i < length; i++) {
        sum = numbers[start] + numbers[end];
        if (sum === target) {
            return [start + 1, end + 1];
        }
        else if (sum > target) {
            end--;
        }
        else if (sum < target) {
            start++;
        }
    }
};

let numbers = [2, 7, 11, 15], target = 9;
twoSum(numbers, target);