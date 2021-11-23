let strs = ["cir", "car"];
let count, str;

let map = new Map();

[...strs[0]].map((item, index) => {
    map.set(index, item);
});

strs.map((item, index) => {
    count = 0;
    str = '';
    [...item].some((innerItem, index) => {
        if (map.get(index) === innerItem) {
            count++;
            str += innerItem;
        }
        else {
            return true;
        }
    });
});

console.log(count, str);