const Task = require('../model/Tasks');
const getAllTasks = (req, res) => {
    res.json({
        name: 'sex'
    });
};

const createTask = (req, res) => {
    res.json({
        body: "req.body"
    });
}

const updateTask = (req, res) => {
    console.log(req.query);
    console.log(req.params);
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