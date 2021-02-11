const express = require('express');
const cors = require('cors');

const routes = require('./routes.js')

//Variable that stores all the application
const app = express();

//Afterwards it's necessary to put the origin
app.use(cors());

app.use(express.json());
app.use(routes);

//Selected door to listened and test the backend
app.listen(3333);
