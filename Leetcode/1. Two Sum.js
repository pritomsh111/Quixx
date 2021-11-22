let numbers = [2, 4, 11, 3];
let target = 6;
let resultArray = [];
let map = new Map();

numbers.some((item, index) => {
    if (map.has(target - item)) {
        return [map.get(target - item), index];
    }
    else {
        map.set(item, index);
    }
});