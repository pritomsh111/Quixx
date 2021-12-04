var canBeTypedWords = function (text, brokenLetters) {
    let count = 0;
    let reg = new RegExp(`[${brokenLetters}]`);
    text = text.split(" ");
    for (let i = 0; i < text.length; i++) {
        if (text[i].search(reg) >= 0) {
            count++;
        }
    }
    return text.length - count;
};
let text = "leet code", brokenLetters = "e";
console.log(canBeTypedWords(text, brokenLetters));