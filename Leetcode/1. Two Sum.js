let numbers = [3, 2, 4];
let target = 6;
let resultArray = [];
let map = new Map();
numbers.map((item, index) => {
    if (!map.has(item)) {
        map.set(item, [index]);
    }
    else {
        map.set(item, [...map.get(item), index]);
    }
});

numbers.some((item, index) => {
    let number1 = target - item;
    if (map.has(number1)) {
        if (index === map.get(number1)[0]) {
            resultArray = [index, map.get(number1)[1]];
            return true;
        }
        else {
            resultArray = [index, map.get(number1)[0]];
            return true;
        }
    }
});

console.log(resultArray);