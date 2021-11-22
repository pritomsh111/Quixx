let numbers = [1, 2, 1, 4];
let map = new Map();
numbers.map((item, index) => {
    if (!map.has(item)) {
        map.set(item, [index]);
    }
    else {
        map.set(item, [...map.get(item), index]);
    }
});


console.log(map);