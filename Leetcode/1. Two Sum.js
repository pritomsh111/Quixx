let nums = [3, 3];
let target = 6;
let resultArray = [];
let map = new Map();

nums.some((item, index) => {
    if (map.has(target - item)) {
        resultArray = [map.get(target - item), index];
        return true;
    }
    else {
        map.set(item, index);
    }
});

console.log(resultArray);