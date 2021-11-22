let numbers = [1, 2, 1, 4];
let target = 5;
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

numbers.map((item, index) => {
    let number1 = target - item;
    if (map.has(number1)) {
        if (index === map.get(number1)[0]) {
            resultArray.concat(index).concat(map.get(number1)[1]);
        }
        else {
            resultArray.concat(index).concat(map.get(number1)[0]);
        }
    }
});

console.log(resultArray);