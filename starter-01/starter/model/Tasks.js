const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
});

module.exports = mongoose.Model('Task', TaskSchema);