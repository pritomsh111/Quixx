const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: 'string',
    },
    completed: Boolean,
});

module.exports = mongoose.model('Test', TaskSchema);