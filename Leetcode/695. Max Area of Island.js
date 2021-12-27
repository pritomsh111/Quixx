var maxAreaOfIsland = function (grid) {
    let row = grid.length, column = grid[0].length;
    let max = 0, count = 0;
    const dfs = (r, c) => {
        if (r < 0 || r > row - 1 || c < 0 || c > column - 1) {
            return;
        }
        if (!grid[r][c]) {
            return;
        }
        if (grid[r][c] === 2) {
            return;
        }
        grid[r][c] = 2;
        ++count > max ? max = count : null;
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            if (grid[i][j] === 1) {
                count = 0;
                dfs(i, j);
            }
        }
    }
    return max;
};

let grid = [[0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0], [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]];
maxAreaOfIsland(grid);