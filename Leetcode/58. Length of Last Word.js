let s = "       dsjai   dsiadj iasdi    ja     ";

s = s.trim();

s = s.split(" ");
function hello() {
    console.log("Wassup");
    for (let i = 0; i < 2; i++) {
        console.log("waxxxxxxxx");
        return;
    }
    console.log("DSDS");
    return "222";
}

console.log(s.length, s[s.length - 1].length, hello());