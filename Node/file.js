const file = require('fs');
const path = require('path');

file.readFile(`${path.join(__dirname, 'demo', 'text.txt')}`, 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
})

file.writeFile(`${__dirname + '\\' + 'file.txt'}`, 'utyyyyyyyyyf8', (err) => {
    if (err) {
        console.log(err);
        return;
    }
});