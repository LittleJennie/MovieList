const routes = require('express').Router();
const controller = require('./controller/index.js');

routes.get('/all', controller.all.get);
routes.post('/all', controller.all.post);
routes.put('/all', controller.all.put);
// add route to delete a movie as well --> need to implement front end feature as well 

routes.get('/towatch', controller.towatch.get);

routes.get('/watched', controller.watched.get);

// add route to individual id as well



module.exports = routes;