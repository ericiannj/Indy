const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  async create(request, response) {
    //Should I pass the password through the body?
    const { name, password, email, city, country } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('creators').insert({
      id,
      name,
      password,
      email,
      city,
      country,
    });

    return response.json({ id, name, password });
  },

  async index(request, response) {
    const creators = await connection('creators').select('*');

    return response.json(creators);
  }
}