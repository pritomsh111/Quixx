const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: [true, "Yo bro!"],
        required: true,
        maxLength: 10,
    },
    completed: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('Test', TaskSchema);