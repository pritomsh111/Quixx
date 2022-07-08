const Task = require('../model/Tasks');
const getAllTasks = (req, res) => {
    console.log(req.body);
    res.json({ name: 'pritom' });
};

const createTask = (req, res) => {
    res.json({ name: 'Pritom' });
}

const updateTask = (req, res) => {
    res.json({ name: "Update" });
}

const deleteTask = (req, res) => {
    res.json({ name: "Delete" });
}

module.exports = {
    getAllTasks, createTask, deleteTask, updateTask,
}