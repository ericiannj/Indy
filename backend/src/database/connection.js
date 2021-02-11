const knex = require('knex');
//Import configurations from the data base
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection;