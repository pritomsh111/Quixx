const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

require('./model/Tasks');

const port = 5000;

// Middlewares
app.use(express.static('./public'));

app.use(express.json());

app.use('/api/v1/tasks', tasks);

app.get('/yo', (req, res) => {
    res.send("Yo");
});

const start = async () => {
    try {
        await connectDB(`${process.env.MONGO_URI}`);
        app.listen(port, () => (
            console.log("Server running..."),
            console.log(Math.random().toString(10).slice(2))
        ));
    } catch (err) {
        console.log(err);
    }
}

start();