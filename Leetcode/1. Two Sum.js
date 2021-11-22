let numbers = [2, 4, 11, 3];
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
            if (resultArray[0] !== undefined && resultArray[1] !== undefined) {
                return true;
            }
        }
        else {
            resultArray = [index, map.get(number1)[0]];
            if (resultArray[0] !== undefined && resultArray[1] !== undefined) {
                return true;
            }
        }
    }
});

console.log(resultArray);