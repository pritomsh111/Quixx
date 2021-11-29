var isPalindrome = function (s) {
    s = s.replace(/[^0-9a-zA-Z]/g, "");
    s = s.toLowerCase();
    let dup = s;
    s = s.split("").reverse().join("");
    if (dup === s) {
        return true;
    }
    else {
        return false;
    }
};

console.log(isPalindrome("A man, a plan, a canal: Panama"));