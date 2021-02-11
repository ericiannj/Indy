const express = require('express');

const CreatorController = require('./controllers/CreatorController');
const CreationController = require('./controllers/CreationController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/creators', CreatorController.index);
routes.post('/creators', CreatorController.create);

routes.get('/profile', ProfileController.index);

routes.get('/creations', CreationController.index);
routes.post('/creations', CreationController.create);
routes.delete('/creations/:id', CreationController.delete);

module.exports = routes;