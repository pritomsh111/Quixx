const express = require('express');
const routes = express.Router();

const { getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/tasks');

routes.route('/').get(getAllTasks).post(createTask);
routes.route('/:id').put(updateTask).delete(deleteTask);

module.exports = routes;