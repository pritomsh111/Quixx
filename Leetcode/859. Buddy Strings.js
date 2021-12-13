var buddyStrings = function (s, goal) {
    let sLen = s.length, gLen = goal.length;
    if (sLen !== gLen) {
        return false;
    }
    s = s.split("");
    goal = goal.split("");
    for (let i = 0, t = null, j = null; i < gLen; i++) {
        if (goal[i] !== s[i]) {
            if (t === null) {
                t = s[i];
                j = i;
            }
            else {
                s[j] = s[i];
                s[i] = t;
                if (s.join("") === goal.join("")) {
                    return true;
                }
                return false;
            }
        }
    }
    return true;
};
let s = "ab", goal = "ba";
console.log(buddyStrings(s, goal));