let n = 19, sum, dup;
while (n > 1) {
    sum = 0;
    dup = n;
    while (dup > 0) {
        sum += (dup % 10) ** 2;
        dup /= 10;
    }
}