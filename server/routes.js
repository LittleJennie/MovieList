const routes = require('express').Router();
const controller = require('./controller/index.js');

routes.get('/all', controller.all.get);
routes.post('/all', controller.all.post);

routes.get('/towatch', controller.towatch.get);
routes.post('/towatch', controller.towatch.post);
routes.delete('/towatch', controller.towatch.delete);

routes.get('/watched', controller.watched.get);
routes.post('/watched', controller.watched.post);

// add route to individual id as well



module.exports = routes;