var islandPerimeter = function (grid) {
    let row = grid.length, column = grid[0].length;
    let vis = Array.from({ length: row }, () => new Array(column).fill(-1));
    let stack = [];
    let count = 0;

    const dfs = (r, c) => {
        if (r < 0 || r > row - 1 || c < 0 || c > column - 1) {
            count++;
            return;
        }
        if (!grid[r][c]) {
            count++;
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
    for (let i = 0; i < row; i++) {
        let one = grid[i].indexOf(1);
        if (one > -1) {
            dfs(i, one);
            break;
        }
    }

    return count;
};

let grid = [[1, 0, 1]];
console.log(islandPerimeter(grid));