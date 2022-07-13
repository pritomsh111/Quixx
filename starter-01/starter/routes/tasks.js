const express = require('express');
const routes = express.Router();

const { getAllTasks, createTask, updateTask, deleteTask, getSingleTask } = require('../controllers/tasks');

routes.route('/').get(getAllTasks).post(createTask);
routes.route('/:id').get(getSingleTask).put(updateTask).delete(deleteTask);

module.exports = routes;