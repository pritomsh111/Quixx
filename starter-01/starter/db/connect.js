const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://tasks-01:1234@app-1.nlziv.mongodb.net/?retryWrites=true&w=majority';

const connectDB = (url) => {
    return mongoose.connect(connectionString);
}

module.exports = connectDB;