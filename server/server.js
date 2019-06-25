const express = require ('express');
const routes = require('./routes.js');
const path = require('path');

// Middleware
const morgan = require('morgan');
const parser = require('body-parser');

const app = express();
module.exports.app = app;

app.set('port', 3000);

// Logging and parsing
// app.use(morgan('dev'));
// app.use(parser.json());

app.use(express.json());
app.use('/api/movies', express.static(path.join(__dirname, '..', 'dist')));
app.use('/api/movies', routes);



app.listen(app.get('port'))
console.log('Listening on', app.get('port'));