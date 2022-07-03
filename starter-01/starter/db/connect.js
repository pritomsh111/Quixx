const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://tasks-01:<password>@app-1.nlziv.mongodb.net/?retryWrites=true&w=majority';

const connectDB = (url) => {
    return mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: false
    });
}

module.exports = connectDB;