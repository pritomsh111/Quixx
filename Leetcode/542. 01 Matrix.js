var updateMatrix = function (mat) {
    let row = mat.length, column = mat[0].length;
    let vis, min, i, j;
    const dfs = (r, c, count) => {
        if (r < 0 || r > row - 1 || c < 0 || c > column - 1) {
            return;
        }
        if (!mat[r][c]) {
            min = Math.min(count, min);
            mat[i][j] = min;
            return;
        }
        if (vis[r][c] === 2) {
            return;
        }
        count++;
        vis[r][c] = 2;
        dfs(r + 1, c, count);
        dfs(r - 1, c, count);
        dfs(r, c + 1, count);
        dfs(r, c - 1, count);
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

let mat = [[0,0,1,0,1,1,1,0,1,1],[1,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,0,0,0,1,1],[1,0,1,0,1,1,1,0,1,1],[0,0,1,1,1,0,1,1,1,1],[1,0,1,1,1,1,1,1,1,1],[1,1,1,1,0,1,0,1,0,1],[0,1,0,0,0,1,0,0,1,1],[1,1,1,0,1,1,0,1,0,1],[1,0,1,1,1,0,1,1,1,0]];
console.log(updateMatrix(mat));