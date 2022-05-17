const { readFile, writeFile } = require('fs').promises;
const path = require('path');

(async function () {
    const read = await readFile(`${path.join(__dirname) + '/file.txt'}`, 'utf8');
    console.log(read);

    const write = await writeFile(`${path.resolve(__dirname) + '/file.txt'}`, "orrrrrrrre", { flag: 'a' });
})();