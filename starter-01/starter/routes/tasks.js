const express = require('express');
const routes = express.Router();

const { getAllTasks } = require('../controllers/tasks');

routes.route('/').get(getAllTasks);

module.exports = routes;