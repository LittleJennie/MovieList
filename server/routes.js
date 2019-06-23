const routes = require('express').Router();
const controller = require('./controller/index.js');

routes.get('/', controller);

module.exports = routes;