var floodFill = function (image, sr, sc, newColor) {
    let temp = image[sr][sc];
    let m = image.length, n = image[0].length;
    const dfs = (sr, sc) => {
        console.log({ sr, sc }, image);
        if (sr < 0 || sr > m - 1 || sc < 0 || sc > n - 1) {
            return;
        }
        if (image[sr][sc] !== temp) {
            return;
        }
        image[sr][sc] = newColor;
        dfs(sr + 1, sc);
        dfs(sr - 1, sc);
        dfs(sr, sc + 1);
        dfs(sr, sc - 1);
    }

    dfs(sr, sc);
    return image;
};

let image = [[0, 0, 0], [0, 0, 0]], sr = 0, sc = 0, newColor = 2;
floodFill(image, sr, sc, newColor);