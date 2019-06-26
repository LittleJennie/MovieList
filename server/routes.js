const routes = require('express').Router();
const controller = require('./controller/index.js');

routes.get('/all', controller.get);
routes.post('/all', controller.post);
routes.put('/all/:id', controller.put);
routes.get('/all/:curview', controller.getCurViewMovies)
// add route to delete a movie as well --> need to implement front end feature as well 


module.exports = routes;

