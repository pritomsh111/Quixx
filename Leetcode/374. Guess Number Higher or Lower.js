var guessNumber = function (n) {
    const arr = [1, 0, -1];
    const guess = () => {
        return arr[Math.floor(Math.random() * 3)];
    }
    const binary = (start, end) => {
        if (start > end) {
            return start;
        }
        mid = start + Math.floor((end - start) / 2);
        let gs = guess(mid);
        if (gs === 0) {
            return mid;
        }
        else if (gs === 1) {
            return binary(mid + 1, end);
        }
        else if (gs === -1) {
            return binary(start, mid - 1);
        }
    }
    return binary(1, n);
};

let n = 10;
console.log(guessNumber(n));