const express = require('express');
const app = express();
const tasks = require('./routes/tasks');

app.use(express.static('./public'));

app.use('/api/v1/tasks', tasks);

app.get('/yo', (req, res) => {
    res.send("Yo");
});

const port = 5000;
app.listen(port, () => (
    console.log("running..."),
    console.log(Math.random().toString(27).slice(2))
));