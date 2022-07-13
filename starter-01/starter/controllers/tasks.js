const Task = require('../model/Tasks');
const getAllTasks = (req, res) => {
    res.json({
        name: 'sex'
    });
};

const getSingleTask = (req, res) => {
    res.json(req.params.id);
}

const createTask = async (req, res) => {
    // res.json(req.body);
    const task = await Task.create(req.body);
    // console.log(req.body);
    // console.log(task);
    res.status(201).json(task);
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
    getAllTasks, getSingleTask, createTask, deleteTask, updateTask,
}