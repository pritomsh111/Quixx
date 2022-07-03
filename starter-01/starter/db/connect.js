const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://tasks-01:<password>@app-1.nlziv.mongodb.net/?retryWrites=true&w=majority';

const connectDB = (url) => {
    return mongoose.connect(connectionString);
}

module.exports = connectDB;