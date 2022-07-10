const Task = require('../model/Tasks');
const getAllTasks = (req, res) => {
    console.log(req.body);
    res.json({
        name: 'sex'
    });
};

const createTask = (req, res) => {
    res.json({
        name: 'boobs'
    });
}

const updateTask = (req, res) => {
    res.json({
        name: "Update"
    });
}

const deleteTask = (req, res) => {
    res.json({
        name: "Delete"
    });
}

module.exports = {
    getAllTasks, createTask, deleteTask, updateTask,
}