let mapper = new Map();
let l1 = [1, 2, 4], l2 = [1, 3, 4];
l1.map(item => {
    mapper.set(item, mapper.get(item) ? mapper.get(item) + 1 : 1);
});
l2.map(item => {
    mapper.set(item, mapper.get(item) ? mapper.get(item) + 1 : 1);
});

let arr = Array.from(mapper);
arr.sort((a, b) => a[0] - b[0]);
let res = [];
arr.map(item => {
    [...new Array(item[1])].map(i => res.push(item[0]));
});

console.log(res);