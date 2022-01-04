var updateMatrix = function (mat) {
    let row = mat.length, column = mat[0].length;
    let vis, min, i, j;
    const dfs = (r, c) => {
        if (r < 0 || r > row - 1 || c < 0 || c > column - 1) {
            return;
        }
        if (!mat[r][c]) {
            min = Math.min(Math.abs(i - r) + Math.abs(j - c), min);
            mat[i][j] = min;
            return;
        }
        if (vis[r][c] === 2) {
            return;
        }
        vis[r][c] = 2;
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }
    for (i = 0; i < row; i++) {
        for (j = 0; j < column; j++) {
            if (mat[i][j] === 1) {
                min = 2147483648;
                vis = Array.from({ length: row }, () => new Array(column).fill(-1));
                console.log({ i, j });
                dfs(i, j, 0);
            }
        }
    }
    return mat;
};

let mat = [[1, 1, 1], [0, 1, 1], [1, 1, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1]];
console.log(updateMatrix(mat));