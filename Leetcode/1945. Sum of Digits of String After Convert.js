var getLucky = function (s, k) {
    let length = s.length, sum = '';

    for (let i = 0; i < length; i++) {
        sum += s.charCodeAt(i) - 96 + "";
    }
    while (--k >= 0) {
        let newSum = sum + '', ss = 0, i = 0;
        let length = newSum.length;
        while (i < length) {
            ss += parseInt(newSum[i++]);
        }
        sum = ss;
    }
    return sum;
};

console.log(getLucky("dbvmfhnttvr", 5));