let map = new Map();
let l1 = [1, 2, 4], l2 = [1, 3, 4];
l1.map(item => {
    map.set(item, map.get(item) ? map.get(item) + 1 : 1);
});
l2.map(item => {
    map.set(item, map.get(item) ? map.get(item) + 1 : 1);
});

let arr = Array.from(map);
arr.sort((a, b) => a[0] - b[0]);
let res = [];
arr.map(item => { item.map(innerItem => innerItem.map(resItem => res.push(item[0]))); });

console.log(arr, res);