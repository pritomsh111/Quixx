const Task = require('../model/Tasks');
const getAllTasks = async (req, res) => {
    const tasks = await Task.find({ name: /p/i, completed: true });
    try {
        if (tasks) {
            return res.status(200).json(tasks);
        }
        res.status(404).json(tasks);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getSingleTask = (req, res) => {
    res.json(req.params.id);
}

const createTask = async (req, res) => {
    const task = await Task.create(req.body);
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