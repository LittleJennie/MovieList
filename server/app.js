const express = require ('express');
const routes = require('./routes.js');



const app = express();

app.set('port', 3000);

app.use('/api/movies', routes);




app.listen(app.get('port'));