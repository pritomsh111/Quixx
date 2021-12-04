var canBeTypedWords = function (text, brokenLetters) {
    let count = 0;
    text.split(" ").map(item => {
        if (item.search(/[^brokenLetters]/) >= 0) {
            count++;
        }
    });
    return count;
};
let text = "hello world", brokenLetters = "ad";
console.log(canBeTypedWords(text, brokenLetters));