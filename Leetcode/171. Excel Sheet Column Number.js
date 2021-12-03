var titleToNumber = function (columnTitle) {
    let length = columnTitle.length, i = 0, sum = 0;

    while (i < length) {
        let l = length - (i + 1);
        sum += (columnTitle.charCodeAt(i) - 64) * Math.pow(26, l);
        i++;
    }
    return sum;
};
let columnTitle = "BAC";
console.log(titleToNumber(columnTitle));